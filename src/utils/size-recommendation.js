const fitOrder = ["XS", "S", "M", "L", "XL", "XXL"];

export const normalizeSizeChart = (sizeChartJson) => {
  if (!Array.isArray(sizeChartJson)) {
    return [];
  }

  return sizeChartJson.filter((entry) => entry && typeof entry.size === "string");
};

const scoreSize = (entry, profile) => {
  let score = 0;

  const comparisons = [
    [entry.chestCm, profile?.chestCm],
    [entry.waistCm, profile?.waistCm],
    [entry.hipCm, profile?.hipCm],
    [entry.inseamCm, profile?.inseamCm],
    [entry.shoulderCm, profile?.shoulderCm],
  ];

  comparisons.forEach(([target, actual]) => {
    if (typeof target !== "number" || typeof actual !== "number") {
      return;
    }

    const delta = target - actual;
    if (delta >= 0) {
      score += Math.max(0, 30 - delta);
    } else {
      score += Math.max(0, 20 + delta);
    }
  });

  if (profile?.preferredFit === "oversized" && ["L", "XL", "XXL"].includes(entry.size)) {
    score += 6;
  }

  if (profile?.preferredFit === "slim" && ["XS", "S", "M"].includes(entry.size)) {
    score += 6;
  }

  return score;
};

const sortAlternates = (sizes) =>
  [...sizes].sort((left, right) => {
    const leftIndex = fitOrder.indexOf(left);
    const rightIndex = fitOrder.indexOf(right);

    if (leftIndex === -1 && rightIndex === -1) {
      return left.localeCompare(right);
    }

    if (leftIndex === -1) {
      return 1;
    }

    if (rightIndex === -1) {
      return -1;
    }

    return leftIndex - rightIndex;
  });

const buildReasonTags = (bodyProfile, recommendedSize) => {
  const reasons = [];

  if (bodyProfile?.preferredFit) {
    reasons.push({
      code: "preferred-fit",
      label: `Preferred fit: ${bodyProfile.preferredFit}`,
    });
  }

  if (bodyProfile?.chestCm || bodyProfile?.waistCm || bodyProfile?.hipCm) {
    reasons.push({
      code: "measurement-match",
      label: `Measurement match for ${recommendedSize}`,
    });
  }

  if (bodyProfile?.landmarkSummary?.confidence) {
    reasons.push({
      code: "vision-confidence",
      label: `Vision confidence ${Math.round(bodyProfile.landmarkSummary.confidence * 100)}%`,
    });
  }

  return reasons;
};

export const getRecommendedSize = (product, bodyProfile) => {
  const sizeChart = normalizeSizeChart(product?.sizeChartJson);

  if (sizeChart.length === 0) {
    return {
      recommendedSize: null,
      alternates: [],
      confidence: 0,
      explanation: "Complete your body profile to see a size recommendation.",
    };
  }

  const ranked = sizeChart
    .map((entry) => ({ size: entry.size, score: scoreSize(entry, bodyProfile) }))
    .sort((left, right) => right.score - left.score);

  const recommendedSize = ranked[0]?.size ?? sizeChart[0]?.size ?? null;
  const alternates = sortAlternates(ranked.slice(1, 4).map((entry) => entry.size));

  return {
    recommendedSize,
    alternates,
    confidence: Number(Math.min(0.98, 0.5 + (ranked[0]?.score || 0) / 120).toFixed(2)),
    explanation: recommendedSize
      ? `Recommended ${recommendedSize} based on your measurements and preferred fit.`
      : "Complete your body profile to see a size recommendation.",
    reasonTags: buildReasonTags(bodyProfile, recommendedSize),
  };
};