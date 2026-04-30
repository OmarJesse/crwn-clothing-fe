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
import { runInferenceOnImage, drawOverlay, estimateLivePose } from "../inference/landmarks";
import {
  inferMeasurementsFromPose,
  fallbackMeasurementsFromHeightWeight,
  inferBodyShape,
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

const CaptureStep = ({ wizard, onAdvance, onBack }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PERMISSION_STATES.PROMPT);
  const [facingMode, setFacingMode] = useState("user");
  const [progress, setProgress] = useState("");
  const [running, setRunning] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [livePoseDetected, setLivePoseDetected] = useState(false);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);
  const liveCanvasRef = useRef(null);
  const rafRef = useRef(0);
  const liveBusyRef = useRef(false);
  const lastFrameAtRef = useRef(0);

  useEffect(() => {
    if (wizard.state.capture.photoDataUrl && wizard.state.inference) {
      setMode((current) => (current === PERMISSION_STATES.PROMPT ? PERMISSION_STATES.UPLOAD : current));
    }
  }, [wizard.state.capture.photoDataUrl, wizard.state.inference]);

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
      setRunning(true);
      setErrorMsg("");
      setProgress("Loading detection models…");

      const heightCm = Number(wizard.state.measurements.heightCm) || 170;
      const weightKg = Number(wizard.state.measurements.weightKg) || 70;

      try {
        const result = await runInferenceOnImage(dataUrl, {
          onProgress: (stage) => {
            if (stage === "face") setProgress("Detecting face landmarks…");
            if (stage === "pose") setProgress("Detecting body pose…");
            if (stage === "done") setProgress("");
          },
        });

        let measurements = inferMeasurementsFromPose({
          pose: result.pose,
          frameWidth: result.frameWidth,
          frameHeight: result.frameHeight,
          heightCm,
        });

        let usedFallback = false;
        if (!measurements) {
          usedFallback = true;
          measurements = fallbackMeasurementsFromHeightWeight(heightCm, weightKg);
        }

        const bodyShape = inferBodyShape(measurements);

        setProgress("Analyzing palette…");
        const styleProfile = await inferStyleFromImage(dataUrl, measurements);

        wizard.setCapture({ photoDataUrl: dataUrl, source, capturedAt: Date.now() });
        wizard.setInference({
          confidence: result.confidence,
          face: !!result.face,
          pose: !!result.pose,
          usedFallback,
          bodyShape,
          style: styleProfile,
          errors: result.errors,
        });
        wizard.applyInferredMeasurements(measurements);
        if (styleProfile) dispatch(setStyleProfile(styleProfile));

        if (usedFallback) {
          setErrorMsg(
            "We couldn't detect your full body. Using estimated measurements — please review them on the next step."
          );
        }
      } catch (err) {
        setErrorMsg("Inference failed. You can still type your measurements on the next step.");
        const measurements = fallbackMeasurementsFromHeightWeight(heightCm, weightKg);
        wizard.setCapture({ photoDataUrl: dataUrl, source, capturedAt: Date.now() });
        wizard.setInference({ confidence: 0, face: false, pose: false, usedFallback: true });
        wizard.applyInferredMeasurements(measurements);
      } finally {
        setRunning(false);
        setProgress("");
      }
    },
    [wizard]
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
            <StagePill $live={livePoseDetected}>
              <span className="dot" />
              {livePoseDetected ? "Body tracked" : "Searching for body…"}
            </StagePill>
          </Stage>
          <ActionRow>
            <GhostAction
              type="button"
              onClick={() => setFacingMode((current) => (current === "user" ? { exact: "environment" } : "user"))}
            >
              Flip camera
            </GhostAction>
            <PrimaryAction type="button" onClick={captureFromWebcam} disabled={running}>
              {running ? progress || "Analyzing…" : "Capture frame"}
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
