const PALETTE_BUCKETS = {
  warm: { label: "Warm", anchors: [[225, 110, 75], [240, 175, 100], [200, 80, 60], [160, 90, 70]] },
  cool: { label: "Cool", anchors: [[60, 130, 205], [80, 170, 220], [50, 90, 160], [40, 60, 140]] },
  neutral: { label: "Neutral", anchors: [[230, 230, 230], [180, 180, 180], [110, 110, 110], [50, 50, 50]] },
  earth: { label: "Earth", anchors: [[120, 90, 60], [150, 120, 80], [90, 80, 60], [70, 60, 40]] },
  jewel: { label: "Jewel", anchors: [[140, 50, 90], [70, 50, 120], [40, 100, 90], [120, 70, 130]] },
  monochrome: { label: "Monochrome", anchors: [[20, 20, 20], [60, 60, 60], [200, 200, 200], [240, 240, 240]] },
};

const SAMPLE_SIZE = 64;

const colorDistance = (a, b) => {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

const rgbToHex = ([r, g, b]) =>
  "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

const sampleImage = (image) => {
  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  return ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data;
};

const extractPalette = (pixels) => {
  const buckets = new Map();

  for (let i = 0; i < pixels.length; i += 4) {
    const a = pixels[i + 3];
    if (a < 128) continue;

    const r = pixels[i] >> 5;
    const g = pixels[i + 1] >> 5;
    const b = pixels[i + 2] >> 5;
    const key = (r << 6) | (g << 3) | b;

    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { count: 0, r: 0, g: 0, b: 0 };
      buckets.set(key, bucket);
    }
    bucket.count++;
    bucket.r += pixels[i];
    bucket.g += pixels[i + 1];
    bucket.b += pixels[i + 2];
  }

  return [...buckets.values()]
    .map((bucket) => ({
      rgb: [
        Math.round(bucket.r / bucket.count),
        Math.round(bucket.g / bucket.count),
        Math.round(bucket.b / bucket.count),
      ],
      count: bucket.count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

const classifyBucket = (palette) => {
  if (palette.length === 0) return { bucket: "neutral", scores: {} };

  const scores = {};
  Object.entries(PALETTE_BUCKETS).forEach(([name, info]) => {
    let total = 0;
    palette.forEach(({ rgb, count }) => {
      const closest = info.anchors.reduce((min, anchor) => {
        const d = colorDistance(rgb, anchor);
        return d < min ? d : min;
      }, Infinity);
      total += count / (1 + closest);
    });
    scores[name] = total;
  });

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return { bucket: winner[0], scores };
};

export const inferSilhouette = ({ shoulderCm, waistCm, hipCm }) => {
  const s = Number(shoulderCm);
  const w = Number(waistCm);
  const h = Number(hipCm);
  if (!s || !w || !h) return null;

  const shoulderToHip = s / h;
  const waistToHip = w / h;

  if (waistToHip < 0.78 && Math.abs(shoulderToHip - 1) < 0.08) return "hourglass";
  if (shoulderToHip > 1.07) return "inverted-triangle";
  if (shoulderToHip < 0.93) return "triangle";
  if (waistToHip > 0.92) return "oval";
  return "rectangle";
};

export const inferStyleFromImage = async (dataUrl, measurements = {}) => {
  if (!dataUrl) return null;

  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  }).catch(() => null);

  if (!image) return null;

  const pixels = sampleImage(image);
  if (!pixels) return null;

  const palette = extractPalette(pixels);
  const paletteHex = palette.map((entry) => rgbToHex(entry.rgb));
  const { bucket, scores } = classifyBucket(palette);
  const totalScore = Object.values(scores).reduce((acc, v) => acc + v, 0) || 1;
  const confidence = Math.min(1, (scores[bucket] || 0) / totalScore);
  const silhouette = inferSilhouette(measurements);

  return {
    palette: paletteHex,
    paletteBucket: bucket,
    paletteLabel: PALETTE_BUCKETS[bucket]?.label || "Neutral",
    silhouette,
    confidence: Number(confidence.toFixed(3)),
    inferredAt: Date.now(),
  };
};

export const getBucketLabel = (bucket) => PALETTE_BUCKETS[bucket]?.label || "Neutral";
