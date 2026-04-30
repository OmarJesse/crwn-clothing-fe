const KEYPOINT_THRESHOLD = 0.3;

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

const findPoint = (keypoints, name) => {
  const k = keypoints.find((kp) => kp.name === name);
  return k && (k.score === undefined || k.score >= KEYPOINT_THRESHOLD) ? k : null;
};

const round = (n, p = 1) => Math.round(n * 10 ** p) / 10 ** p;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const computeBmi = (heightCm, weightKg) => {
  if (!heightCm || !weightKg) return null;
  const m = Number(heightCm) / 100;
  if (!m) return null;
  return round(Number(weightKg) / (m * m), 1);
};

export const inferBodyShape = ({ shoulderCm, waistCm, hipCm }) => {
  if (!shoulderCm || !waistCm || !hipCm) return null;
  const shoulderToHip = shoulderCm / hipCm;
  const waistToHip = waistCm / hipCm;
  if (waistToHip < 0.75 && Math.abs(shoulderToHip - 1) < 0.08) return "hourglass";
  if (shoulderToHip > 1.07) return "inverted-triangle";
  if (shoulderToHip < 0.93) return "triangle";
  if (waistToHip > 0.9) return "oval";
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
