const KEYPOINT_THRESHOLD = 0.3;

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

const findPoint = (keypoints, name) => {
  const k = keypoints.find((kp) => kp.name === name);
  return k && (k.score === undefined || k.score >= KEYPOINT_THRESHOLD) ? k : null;
};

// MediaPipe FaceMesh outer-eye-corner indices. Distance between these two
// landmarks is ~9–10 cm in adults (mean ≈ 9.5 cm, σ ≈ 0.5 cm) — far more
// consistent across the population than skull or face length, which makes
// it a clean scale anchor for 2D photos.
const OUTER_EYE_LEFT = 33;
const OUTER_EYE_RIGHT = 263;
const OUTER_EYE_DISTANCE_CM = 9.5;

/**
 * Estimate the subject's standing height from pose + face landmarks alone.
 *
 * Method: use the outer eye corner distance from FaceMesh as a scale anchor
 * (≈ 9.5 cm), convert to pixels-per-cm, then measure nose→ankle in pose-pixel
 * space and convert to cm. Nose→ankle on a frontal full-body shot is ≈ 87 %
 * of total height in adults (anthropometric reference), so we divide by 0.87.
 *
 * Returns null if either input is missing or the frame doesn't include the
 * subject's feet. Caller should treat the result as a noisy suggestion
 * (typical error ± 5 cm) and let the user confirm in the measurements step.
 */
export const inferHeightFromLandmarks = ({ pose, face }) => {
  if (!pose || !Array.isArray(pose.keypoints) || !face?.keypoints) return null;

  const lEye = face.keypoints[OUTER_EYE_LEFT];
  const rEye = face.keypoints[OUTER_EYE_RIGHT];
  if (!lEye || !rEye) return null;

  const eyeSpanPx = Math.hypot(lEye.x - rEye.x, lEye.y - rEye.y);
  if (!eyeSpanPx) return null;
  const pixelsPerCm = eyeSpanPx / OUTER_EYE_DISTANCE_CM;

  const nose = findPoint(pose.keypoints, "nose");
  const lAnkle = findPoint(pose.keypoints, "left_ankle");
  const rAnkle = findPoint(pose.keypoints, "right_ankle");
  if (!nose) return null;
  const ankle = lAnkle && rAnkle
    ? (lAnkle.y > rAnkle.y ? lAnkle : rAnkle)
    : (lAnkle || rAnkle);
  if (!ankle) return null;

  const noseToAnklePx = Math.abs(ankle.y - nose.y);
  if (noseToAnklePx <= 0) return null;

  const noseToAnkleCm = noseToAnklePx / pixelsPerCm;
  const estimatedHeight = noseToAnkleCm / 0.87;

  return clamp(round(estimatedHeight, 1), 130, 220);
};

const round = (n, p = 1) => Math.round(n * 10 ** p) / 10 ** p;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const computeBmi = (heightCm, weightKg) => {
  if (!heightCm || !weightKg) return null;
  const m = Number(heightCm) / 100;
  if (!m) return null;
  return round(Number(weightKg) / (m * m), 1);
};

// FFIT body-shape classification — bust(=chest)/waist/hip circumferences.
// Kept byte-for-byte equivalent to the API's classifyBodyShape (bodyShape.ts)
// so the shape shown during onboarding always matches the persisted profile.
// Reference: Simmons, Istook & Devarajan (2004), "FFIT for Apparel."
const BALANCE_TOL = 0.07; // bust & hip within ±7% of hip = balanced
const DEFINED_WAIST = 0.85; // waist ≤ 85% of both bust and hip = defined
const UNDEFINED_WAIST_WHR = 0.9;

export const inferBodyShape = ({ chestCm, waistCm, hipCm }) => {
  const bust = Number(chestCm);
  const waist = Number(waistCm);
  const hip = Number(hipCm);
  if (!bust || !waist || !hip) return null;

  const bustHipDiff = bust - hip;
  const balanced = Math.abs(bustHipDiff) <= BALANCE_TOL * hip;
  const whr = waist / hip;
  const wbr = waist / bust;
  const definedWaist = whr <= DEFINED_WAIST && wbr <= DEFINED_WAIST;

  if (definedWaist) {
    if (balanced) return "hourglass";
    return hip > bust ? "triangle" : "inverted-triangle";
  }
  if (bustHipDiff > BALANCE_TOL * hip) return "inverted-triangle";
  if (bustHipDiff < -BALANCE_TOL * hip) return "triangle";
  if (whr > UNDEFINED_WAIST_WHR || waist >= bust) return "oval";
  return "rectangle";
};

const buildPoseRatios = (pose, frameWidth, frameHeight) => {
  if (!pose || !Array.isArray(pose.keypoints)) return null;

  const kp = pose.keypoints;
  const ls = findPoint(kp, "left_shoulder");
  const rs = findPoint(kp, "right_shoulder");
  const lh = findPoint(kp, "left_hip");
  const rh = findPoint(kp, "right_hip");
  const la = findPoint(kp, "left_ankle");
  const ra = findPoint(kp, "right_ankle");
  const nose = findPoint(kp, "nose");

  if (!ls || !rs || !lh || !rh) return null;

  const shoulderPx = dist(ls, rs);
  const hipPx = dist(lh, rh);
  const torsoMidShoulder = { x: (ls.x + rs.x) / 2, y: (ls.y + rs.y) / 2 };
  const torsoMidHip = { x: (lh.x + rh.x) / 2, y: (lh.y + rh.y) / 2 };
  const torsoPx = dist(torsoMidShoulder, torsoMidHip);

  let inseamPx = null;
  const lowestAnkle = la || ra;
  if (lowestAnkle) {
    const hipMid = torsoMidHip;
    inseamPx = dist(hipMid, lowestAnkle);
  }

  let bodyPx = null;
  if (nose && lowestAnkle) bodyPx = Math.abs(lowestAnkle.y - nose.y);

  return {
    shoulderPx,
    hipPx,
    torsoPx,
    inseamPx,
    bodyPx,
    frameWidth,
    frameHeight,
  };
};

export const inferMeasurementsFromPose = ({ pose, frameWidth, frameHeight, heightCm }) => {
  const ratios = buildPoseRatios(pose, frameWidth, frameHeight);
  if (!ratios) return null;

  const referenceHeight = clamp(Number(heightCm) || 170, 130, 220);
  const headRoom = referenceHeight * 0.06;
  const effectiveBodyPx = ratios.bodyPx || ratios.torsoPx * 3.4;
  const cmPerPx = (referenceHeight - headRoom) / effectiveBodyPx;

  const shoulderCm = round(ratios.shoulderPx * cmPerPx * 1.18, 1);
  const hipCm = round(ratios.hipPx * cmPerPx * 1.65, 1);
  const chestCm = round(shoulderCm * 2.05, 1);
  const waistCm = round(hipCm * 0.86, 1);
  const inseamCm = ratios.inseamPx ? round(ratios.inseamPx * cmPerPx, 1) : round(referenceHeight * 0.45, 1);

  return {
    shoulderCm: clamp(shoulderCm, 30, 70),
    chestCm: clamp(chestCm, 70, 150),
    waistCm: clamp(waistCm, 55, 140),
    hipCm: clamp(hipCm, 70, 160),
    inseamCm: clamp(inseamCm, 55, 100),
  };
};

export const fallbackMeasurementsFromHeightWeight = (heightCm, weightKg) => {
  const h = clamp(Number(heightCm) || 170, 130, 220);
  const w = clamp(Number(weightKg) || 70, 35, 200);
  const bmi = w / Math.pow(h / 100, 2);
  const bmiFactor = clamp(bmi / 22, 0.75, 1.4);

  return {
    shoulderCm: round(h * 0.245 * Math.pow(bmiFactor, 0.5), 1),
    chestCm: round(h * 0.51 * bmiFactor, 1),
    waistCm: round(h * 0.45 * bmiFactor, 1),
    hipCm: round(h * 0.53 * bmiFactor, 1),
    inseamCm: round(h * 0.45, 1),
  };
};
