import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import {
  Panel,
  PermissionGrid,
  PermissionCard,
  Stage,
  StagePill,
  ActionRow,
  PrimaryAction,
  GhostAction,
  InlineNote,
  Tag,
  InferenceTags,
} from "../onboarding.styles";
import {
  runInferenceOnImage,
  drawOverlay,
  estimateLivePose,
  prewarmDetectors,
  loadImage,
} from "../inference/landmarks";
import {
  inferMeasurementsFromPose,
  fallbackMeasurementsFromHeightWeight,
  inferBodyShape,
  inferHeightFromLandmarks,
} from "../inference/measurements";
import { inferStyleFromImage } from "../../../utils/style-inference";
import { setStyleProfile } from "../../../store/user/user.action";

const PERMISSION_STATES = {
  PROMPT: "prompt",
  CAMERA: "camera",
  UPLOAD: "upload",
  SKIP: "skip",
  DENIED: "denied",
};

// Tunables for the auto-capture handshake.
const AUTO_STREAK_FRAMES = 10;       // ~1 s of stable detection at our 95 ms throttle
const AUTO_COUNTDOWN_SECONDS = 2;    // visible "auto-capturing in 2…1…" window

const CaptureStep = ({ wizard, onAdvance, onBack }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PERMISSION_STATES.PROMPT);
  const [facingMode, setFacingMode] = useState("user");
  const [progress, setProgress] = useState("");
  const [running, setRunning] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [livePoseDetected, setLivePoseDetected] = useState(false);
  const [warmupReady, setWarmupReady] = useState(false);
  const [autoCountdown, setAutoCountdown] = useState(null);
  const [autoDisabled, setAutoDisabled] = useState(false);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);
  const liveCanvasRef = useRef(null);
  const rafRef = useRef(0);
  const liveBusyRef = useRef(false);
  const lastFrameAtRef = useRef(0);
  // Refs the live tick reads imperatively so it doesn't need to re-bind on every
  // state change. Keep these in sync from state via small useEffect mirrors.
  const streakRef = useRef(0);
  const autoDisabledRef = useRef(false);
  const runningRef = useRef(false);
  const hasPhotoRef = useRef(false);
  const countdownActiveRef = useRef(false);

  useEffect(() => { runningRef.current = running; }, [running]);
  useEffect(() => { autoDisabledRef.current = autoDisabled; }, [autoDisabled]);
  useEffect(() => { hasPhotoRef.current = Boolean(wizard.state.capture.photoDataUrl); }, [wizard.state.capture.photoDataUrl]);
  useEffect(() => { countdownActiveRef.current = autoCountdown !== null; }, [autoCountdown]);

  useEffect(() => {
    if (wizard.state.capture.photoDataUrl && wizard.state.inference) {
      setMode((current) => (current === PERMISSION_STATES.PROMPT ? PERMISSION_STATES.UPLOAD : current));
    }
  }, [wizard.state.capture.photoDataUrl, wizard.state.inference]);

  // The onboarding shell fires prewarmDetectors() as soon as the wizard mounts,
  // so by the time the user lands here the models are usually already warm.
  // We re-call it here as a safety net (idempotent — resolves instantly off the
  // module-level cache if the first call finished). The Promise resolution is
  // what flips warmupReady; we don't bother with per-phase progress anymore
  // because Lightning + WebGL is the only thing being loaded now.
  useEffect(() => {
    let cancelled = false;
    prewarmDetectors().then(() => {
      if (!cancelled) setWarmupReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Live pose overlay loop — runs while camera mode is active and no captured photo yet.
  useEffect(() => {
    const liveActive =
      mode === PERMISSION_STATES.CAMERA && !wizard.state.capture.photoDataUrl;

    if (!liveActive) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      const ctx = liveCanvasRef.current?.getContext?.("2d");
      if (ctx && liveCanvasRef.current) {
        ctx.clearRect(0, 0, liveCanvasRef.current.width, liveCanvasRef.current.height);
      }
      setLivePoseDetected(false);
      return undefined;
    }

    let cancelled = false;

    const tick = async (ts) => {
      if (cancelled) return;
      rafRef.current = requestAnimationFrame(tick);

      const minIntervalMs = 95;
      if (ts - lastFrameAtRef.current < minIntervalMs) return;
      if (liveBusyRef.current) return;

      const video = webcamRef.current?.video;
      if (!video || video.readyState < 2 || video.videoWidth === 0) return;

      lastFrameAtRef.current = ts;
      liveBusyRef.current = true;

      try {
        const pose = await estimateLivePose(video);
        if (cancelled) return;
        drawOverlay(liveCanvasRef.current, video, pose);
        const detected = !!pose && pose.keypoints.some((k) => (k.score ?? 0) > 0.45);
        setLivePoseDetected(detected);

        // Auto-capture handshake: increment a streak counter while detection is
        // stable. When it crosses the threshold and no countdown / capture is
        // already running, kick off the visible countdown the user can cancel.
        if (detected) {
          streakRef.current += 1;
          if (
            streakRef.current >= AUTO_STREAK_FRAMES &&
            !countdownActiveRef.current &&
            !autoDisabledRef.current &&
            !runningRef.current &&
            !hasPhotoRef.current
          ) {
            setAutoCountdown(AUTO_COUNTDOWN_SECONDS);
          }
        } else {
          streakRef.current = 0;
        }
      } catch {
        // ignore — try again next frame
      } finally {
        liveBusyRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      liveBusyRef.current = false;
    };
  }, [mode, wizard.state.capture.photoDataUrl]);

  const runInference = useCallback(
    async (dataUrl, source) => {
      // Show the captured photo IMMEDIATELY so the user gets visual confirmation
      // they can move out of frame. Inference runs in the background after.
      wizard.setCapture({ photoDataUrl: dataUrl, source, capturedAt: Date.now() });

      setRunning(true);
      setErrorMsg("");
      setProgress("Analyzing…");

      const heightCm = Number(wizard.state.measurements.heightCm) || 170;
      const weightKg = Number(wizard.state.measurements.weightKg) || 70;

      try {
        // Decode the JPEG once. The same image is consumed by face inference,
        // pose inference, and palette quantization, all of which previously
        // decoded it independently. This alone saves ~150 ms on a phone.
        const img = await loadImage(dataUrl);

        // Fire all three concurrently. Face + pose internally run in parallel
        // too (inside runInferenceOnImage). The total wall-clock cost is
        // max(face, pose, palette) instead of their sum.
        const [result, styleProfile] = await Promise.all([
          runInferenceOnImage(img, {
            onProgress: (stage) => {
              if (stage === "inference") setProgress("Detecting pose + face…");
              if (stage === "done") setProgress("");
            },
            useFace: true,
          }),
          inferStyleFromImage(img, {}),
        ]);

        // Now the cheap math: height estimate, derived measurements, body shape.
        const estimatedHeight = inferHeightFromLandmarks({
          pose: result.pose,
          face: result.face,
        });
        const userTypedHeight = Number(wizard.state.measurements.heightCm) || null;
        const effectiveHeight = estimatedHeight ?? userTypedHeight ?? 170;

        let measurements = inferMeasurementsFromPose({
          pose: result.pose,
          frameWidth: result.frameWidth,
          frameHeight: result.frameHeight,
          heightCm: effectiveHeight,
        });

        let usedFallback = false;
        if (!measurements) {
          usedFallback = true;
          measurements = fallbackMeasurementsFromHeightWeight(effectiveHeight, weightKg);
        }

        if (estimatedHeight) {
          measurements = { ...measurements, heightCm: estimatedHeight };
        }

        const bodyShape = inferBodyShape(measurements);

        // Re-resolve the silhouette in styleProfile using the just-derived
        // measurements (the parallel inferStyleFromImage call only had {}).
        const resolvedStyle = styleProfile
          ? { ...styleProfile, silhouette: bodyShape || styleProfile.silhouette }
          : null;

        wizard.setInference({
          confidence: result.confidence,
          face: !!result.face,
          pose: !!result.pose,
          usedFallback,
          bodyShape,
          style: resolvedStyle,
          heightInferred: Boolean(estimatedHeight),
          errors: result.errors,
        });
        wizard.applyInferredMeasurements(measurements);
        if (resolvedStyle) dispatch(setStyleProfile(resolvedStyle));

        if (usedFallback) {
          setErrorMsg(
            "We couldn't detect your full body. Using estimated measurements — please review them on the next step."
          );
        }
      } catch (err) {
        setErrorMsg("Inference failed. You can still type your measurements on the next step.");
        const fallback = fallbackMeasurementsFromHeightWeight(heightCm, weightKg);
        wizard.setInference({ confidence: 0, face: false, pose: false, usedFallback: true });
        wizard.applyInferredMeasurements(fallback);
      } finally {
        setRunning(false);
        setProgress("");
      }
    },
    [wizard, dispatch]
  );

  const captureFromWebcam = useCallback(async () => {
    if (!webcamRef.current) return;
    const dataUrl = webcamRef.current.getScreenshot();
    if (!dataUrl) {
      setErrorMsg("Couldn't grab a frame. Try again or upload a photo.");
      return;
    }
    await runInference(dataUrl, "camera");
  }, [runInference]);

  // Auto-capture countdown driver. Decrements once per second; on hitting 0,
  // dispatches captureFromWebcam and clears the countdown. Skipped if the user
  // disabled auto-capture or if a capture is already in flight.
  useEffect(() => {
    if (autoCountdown === null) return undefined;
    if (autoCountdown <= 0) {
      setAutoCountdown(null);
      streakRef.current = 0;
      if (!runningRef.current && !hasPhotoRef.current && !autoDisabledRef.current) {
        captureFromWebcam();
      }
      return undefined;
    }
    const id = setTimeout(() => setAutoCountdown((current) => (current == null ? null : current - 1)), 1000);
    return () => clearTimeout(id);
  }, [autoCountdown, captureFromWebcam]);

  const cancelAutoCapture = useCallback(() => {
    setAutoCountdown(null);
    streakRef.current = 0;
    setAutoDisabled(true);
  }, []);

  const handleFile = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = typeof reader.result === "string" ? reader.result : "";
        if (dataUrl) await runInference(dataUrl, "upload");
      };
      reader.readAsDataURL(file);
    },
    [runInference]
  );

  const handleSkip = () => {
    const heightCm = Number(wizard.state.measurements.heightCm) || 170;
    const weightKg = Number(wizard.state.measurements.weightKg) || 70;
    const measurements = fallbackMeasurementsFromHeightWeight(heightCm, weightKg);
    wizard.applyInferredMeasurements(measurements);
    wizard.setInference({ confidence: 0, face: false, pose: false, usedFallback: true, skipped: true });
    onAdvance();
  };

  const handleRetake = () => {
    wizard.setCapture({ photoDataUrl: "", source: null, capturedAt: null });
    wizard.setInference(null);
    setErrorMsg("");
    setAutoDisabled(false);   // re-enable auto-capture for the next attempt
    streakRef.current = 0;
  };

  const onUserMediaError = (err) => {
    if (err && (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")) {
      setMode(PERMISSION_STATES.DENIED);
    } else {
      setErrorMsg("Camera unavailable. Try uploading a photo instead.");
      setMode(PERMISSION_STATES.UPLOAD);
    }
  };

  const inference = wizard.state.inference;
  const photo = wizard.state.capture.photoDataUrl;

  return (
    <Panel>
      <h2>Capture your photo</h2>
      <p>
        We run pose detection in your browser. Your photo never leaves this device.
      </p>

      {mode === PERMISSION_STATES.PROMPT && (
        <>
          <PermissionGrid>
            <PermissionCard type="button" onClick={() => setMode(PERMISSION_STATES.CAMERA)}>
              <strong>📸 Use camera</strong>
              <span>Stand 2m back so your full body is in frame.</span>
            </PermissionCard>
            <PermissionCard type="button" onClick={() => fileInputRef.current?.click()}>
              <strong>🖼️ Upload photo</strong>
              <span>JPG or PNG, ideally a full-body shot.</span>
            </PermissionCard>
            <PermissionCard type="button" onClick={handleSkip}>
              <strong>⏭️ Skip — type instead</strong>
              <span>Enter your measurements manually.</span>
            </PermissionCard>
          </PermissionGrid>
          <InlineNote $tone={warmupReady ? "success" : "info"}>
            {warmupReady
              ? "✓ AI models ready — capture will be instant."
              : "Preparing AI models in the background…"}
          </InlineNote>
        </>
      )}

      {mode === PERMISSION_STATES.DENIED && (
        <>
          <InlineNote $tone="error">
            Camera permission was denied. You can upload a photo or skip and type your measurements.
          </InlineNote>
          <ActionRow>
            <GhostAction type="button" onClick={() => fileInputRef.current?.click()}>
              Upload a photo
            </GhostAction>
            <PrimaryAction type="button" onClick={handleSkip}>
              Skip — type measurements
            </PrimaryAction>
          </ActionRow>
        </>
      )}

      {mode === PERMISSION_STATES.CAMERA && !photo && (
        <>
          <Stage>
            <Webcam
              ref={webcamRef}
              audio={false}
              mirrored={facingMode === "user"}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.92}
              videoConstraints={{ facingMode, width: 720, height: 960 }}
              onUserMediaError={onUserMediaError}
            />
            <canvas
              ref={liveCanvasRef}
              data-mirrored={facingMode === "user" ? "true" : "false"}
            />
            <StagePill $live={livePoseDetected || autoCountdown !== null}>
              <span className="dot" />
              {autoCountdown !== null
                ? `Auto-capturing in ${autoCountdown}s`
                : livePoseDetected
                ? "Body tracked"
                : "Searching for body…"}
            </StagePill>
          </Stage>
          {autoCountdown !== null ? (
            <InlineNote $tone="info">
              Body locked in — auto-capturing in {autoCountdown}s. Stand still.{" "}
              <button
                type="button"
                onClick={cancelAutoCapture}
                style={{
                  marginLeft: "0.4rem",
                  background: "transparent",
                  border: 0,
                  color: "inherit",
                  textDecoration: "underline",
                  cursor: "pointer",
                  font: "inherit",
                }}
              >
                Cancel
              </button>
            </InlineNote>
          ) : null}
          <ActionRow>
            <GhostAction
              type="button"
              onClick={() => setFacingMode((current) => (current === "user" ? { exact: "environment" } : "user"))}
            >
              Flip camera
            </GhostAction>
            <PrimaryAction type="button" onClick={captureFromWebcam} disabled={running}>
              {running
                ? progress || "Analyzing…"
                : autoCountdown !== null
                ? `Capturing in ${autoCountdown}…`
                : "Capture frame"}
            </PrimaryAction>
          </ActionRow>
        </>
      )}

      {photo && (
        <>
          <Stage>
            <img ref={previewRef} src={photo} alt="Captured preview" />
          </Stage>
          {inference ? (
            <>
              <InferenceTags>
                <Tag $tone={inference.face ? "ok" : "warn"}>
                  {inference.face ? "Face detected" : "No face"}
                </Tag>
                <Tag $tone={inference.pose ? "ok" : "warn"}>
                  {inference.pose ? "Pose detected" : "No pose"}
                </Tag>
                <Tag>Confidence {(inference.confidence * 100).toFixed(0)}%</Tag>
                {inference.bodyShape ? <Tag>Shape: {inference.bodyShape}</Tag> : null}
                {inference.heightInferred ? (
                  <Tag $tone="ok">📐 Height inferred</Tag>
                ) : null}
                {inference.usedFallback ? <Tag $tone="warn">Estimated</Tag> : null}
              </InferenceTags>
              {inference.style ? (
                <InferenceTags>
                  <Tag>Palette: {inference.style.paletteLabel}</Tag>
                  {(inference.style.palette || []).slice(0, 5).map((hex) => (
                    <Tag
                      key={hex}
                      style={{ background: hex, color: "white", textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
                    >
                      {hex}
                    </Tag>
                  ))}
                </InferenceTags>
              ) : null}
            </>
          ) : null}
        </>
      )}

      {errorMsg ? <InlineNote $tone="error">{errorMsg}</InlineNote> : null}
      {running ? <InlineNote>{progress || "Analyzing…"}</InlineNote> : null}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />

      <ActionRow>
        <GhostAction type="button" onClick={onBack}>
          Back
        </GhostAction>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {photo ? (
            <GhostAction type="button" onClick={handleRetake} disabled={running}>
              Retake
            </GhostAction>
          ) : null}
          <PrimaryAction type="button" onClick={onAdvance} disabled={!photo || running}>
            Continue to measurements
          </PrimaryAction>
        </div>
      </ActionRow>
    </Panel>
  );
};

export default CaptureStep;
