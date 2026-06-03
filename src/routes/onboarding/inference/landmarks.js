// One-time backend bootstrap shared by every detector. Loading the WebGL
// backend is by far the biggest single cost of "first inference" — about
// 1.5–2s on a mid-range laptop. Doing it once globally means subsequent
// detector loads only pay the model-weight download cost.
let backendPromise;
const initBackend = async () => {
  if (!backendPromise) {
    backendPromise = (async () => {
      const tf = await import("@tensorflow/tfjs-core");
      await import("@tensorflow/tfjs-backend-webgl");
      await tf.setBackend("webgl");
      await tf.ready();
      return tf;
    })().catch((err) => {
      backendPromise = undefined;
      throw err;
    });
  }
  return backendPromise;
};

let facePromise;
let posePromise;
let livePosePromise;

const loadFaceDetector = async () => {
  if (!facePromise) {
    facePromise = (async () => {
      await initBackend();
      const faceLandmarksDetection = await import("@tensorflow-models/face-landmarks-detection");
      return faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        { runtime: "tfjs", maxFaces: 1, refineLandmarks: true }
      );
    })().catch((err) => {
      facePromise = undefined;
      throw err;
    });
  }
  return facePromise;
};

const loadPoseDetector = async () => {
  if (!posePromise) {
    posePromise = (async () => {
      await initBackend();
      const posedetection = await import("@tensorflow-models/pose-detection");
      return posedetection.createDetector(posedetection.SupportedModels.MoveNet, {
        modelType: posedetection.movenet.modelType.SINGLEPOSE_THUNDER,
      });
    })().catch((err) => {
      posePromise = undefined;
      throw err;
    });
  }
  return posePromise;
};

export const loadLivePoseDetector = async () => {
  if (!livePosePromise) {
    livePosePromise = (async () => {
      await initBackend();
      const posedetection = await import("@tensorflow-models/pose-detection");
      return posedetection.createDetector(posedetection.SupportedModels.MoveNet, {
        modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      });
    })().catch((err) => {
      livePosePromise = undefined;
      throw err;
    });
  }
  return livePosePromise;
};

// Pre-warm only the lightweight detector path we actually use at runtime
// (WebGL backend + MoveNet Lightning). Skipping Thunder and FaceMesh during
// pre-warm saves ~8 MB of model weight download and ~3 s of detector init —
// big difference on first visit. Loaders are idempotent so this is safe to
// call multiple times. Fire-and-forget pattern from the caller.
export const prewarmDetectors = async ({ onProgress } = {}) => {
  // Backend + Lightning fire eagerly (they drive the live preview and the
  // capture inference). Face landmarks fire too because the capture path now
  // uses FaceMesh for the IPD-based height anchor — pre-loading saves ~2 s
  // off the first capture-click.
  const tasks = [
    ["backend", initBackend],
    ["live-pose", loadLivePoseDetector],
    ["face", loadFaceDetector],
  ];
  for (const [label, fn] of tasks) {
    try {
      onProgress?.(label, "loading");
      await fn();
      onProgress?.(label, "ready");
    } catch (err) {
      onProgress?.(label, "failed");
      // Swallow — capture step will retry on demand if needed.
    }
  }
  return { ready: true };
};

const loadImage = (dataUrl) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });

/**
 * Single-shot capture inference. Defaults to MoveNet Lightning (fast),
 * which is the same detector used for the live preview. Measurements are
 * anchored to the user-entered height, so the marginally lower Lightning
 * accuracy (vs Thunder) does not propagate to the cm values. Set `useThunder`
 * if you want to take the +5 s hit for a higher OKS at capture time.
 */
export const runInferenceOnImage = async (
  dataUrl,
  { onProgress, useFace = false, useThunder = false } = {}
) => {
  const result = {
    face: null,
    pose: null,
    confidence: 0,
    frameWidth: 0,
    frameHeight: 0,
    errors: [],
  };

  if (!dataUrl) return result;

  let img;
  try {
    img = await loadImage(dataUrl);
    result.frameWidth = img.naturalWidth;
    result.frameHeight = img.naturalHeight;
  } catch (err) {
    result.errors.push("image-load-failed");
    return result;
  }

  if (useFace) {
    onProgress?.("face");
    try {
      const detector = await loadFaceDetector();
      const faces = await detector.estimateFaces(img);
      if (faces.length > 0) {
        result.face = { keypoints: faces[0].keypoints, box: faces[0].box };
        result.confidence = Math.max(result.confidence, 0.6);
      }
    } catch (err) {
      result.errors.push("face-inference-failed");
    }
  }

  onProgress?.("pose");
  try {
    const poseDetector = useThunder
      ? await loadPoseDetector()
      : await loadLivePoseDetector();
    const poses = await poseDetector.estimatePoses(img, { flipHorizontal: false });
    if (poses.length > 0) {
      result.pose = poses[0];
      const avgScore =
        poses[0].keypoints.reduce((acc, k) => acc + (k.score || 0), 0) /
        poses[0].keypoints.length;
      result.confidence = Math.max(result.confidence, avgScore);
    }
  } catch (err) {
    result.errors.push("pose-inference-failed");
  }

  onProgress?.("done");
  return result;
};

const dimensionsOf = (source) => {
  if (!source) return { w: 0, h: 0 };
  const w = source.videoWidth || source.naturalWidth || source.width || 0;
  const h = source.videoHeight || source.naturalHeight || source.height || 0;
  return { w, h };
};

export const drawOverlay = (canvas, source, pose) => {
  if (!canvas || !source) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { w, h } = dimensionsOf(source);
  if (!w || !h) return;

  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!pose || !Array.isArray(pose.keypoints)) return;

  // Sized in source-canvas pixels — gets scaled down when the canvas is rendered
  // via object-fit: cover, so we need chunky values to read on screen.
  const baseWidth = Math.max(8, canvas.width / 80);
  const outlineWidth = baseWidth + 6;
  const dotRadius = Math.max(7, canvas.width / 90);

  const stroke = "rgba(129,140,248,1)";          // primary indigo
  const outline = "rgba(15,23,42,0.85)";          // dark contrast halo
  const dot = "rgba(236,72,153,1)";               // pink keypoints
  const dotInner = "rgba(255,255,255,1)";

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const skeleton = [
    ["left_shoulder", "right_shoulder"],
    ["left_shoulder", "left_elbow"],
    ["left_elbow", "left_wrist"],
    ["right_shoulder", "right_elbow"],
    ["right_elbow", "right_wrist"],
    ["left_shoulder", "left_hip"],
    ["right_shoulder", "right_hip"],
    ["left_hip", "right_hip"],
    ["left_hip", "left_knee"],
    ["left_knee", "left_ankle"],
    ["right_hip", "right_knee"],
    ["right_knee", "right_ankle"],
  ];

  const byName = Object.fromEntries(pose.keypoints.map((k) => [k.name, k]));

  // Two-pass stroke: dark outline first (slightly wider), then colored stroke
  // on top — ensures the skeleton pops against any background lighting.
  const drawLines = (color, width) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    skeleton.forEach(([a, b]) => {
      const ka = byName[a];
      const kb = byName[b];
      if (!ka || !kb) return;
      if ((ka.score ?? 1) < 0.3 || (kb.score ?? 1) < 0.3) return;
      ctx.beginPath();
      ctx.moveTo(ka.x, ka.y);
      ctx.lineTo(kb.x, kb.y);
      ctx.stroke();
    });
  };

  drawLines(outline, outlineWidth);
  drawLines(stroke, baseWidth);

  // Keypoint dots with a white inner ring for extra visibility
  pose.keypoints.forEach((k) => {
    if ((k.score ?? 1) < 0.3) return;
    ctx.beginPath();
    ctx.arc(k.x, k.y, dotRadius + 2, 0, Math.PI * 2);
    ctx.fillStyle = outline;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(k.x, k.y, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = dot;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(k.x, k.y, dotRadius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = dotInner;
    ctx.fill();
  });
};

export const estimateLivePose = async (videoEl) => {
  if (!videoEl || videoEl.readyState < 2) return null;
  const detector = await loadLivePoseDetector();
  const poses = await detector.estimatePoses(videoEl, { flipHorizontal: false });
  return poses[0] || null;
};
