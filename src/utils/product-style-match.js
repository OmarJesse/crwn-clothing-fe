const SILHOUETTE_TAG_BOOST = {
  hourglass: ["fitted", "wrap", "belted", "tailored"],
  rectangle: ["layered", "draped", "structured", "bold"],
  triangle: ["a-line", "structured-top", "v-neck", "boatneck"],
  "inverted-triangle": ["a-line", "wide-leg", "soft-shoulder", "flowing"],
  oval: ["empire", "vertical-stripes", "open-front", "longline"],
};

const STYLE_TAG_MAP = {
  minimalist: ["tailored", "structured", "minimal", "smart-casual"],
  streetwear: ["casual", "bold", "oversized", "athletic", "athleisure"],
  classic: ["smart-casual", "tailored", "structured", "polo"],
  bohemian: ["flowing", "draped", "linen", "wide-leg", "summer"],
  sporty: ["athletic", "active", "athleisure", "joggers"],
  edgy: ["fitted", "bold", "premium", "biker"],
  preppy: ["smart-casual", "polo", "tailored", "structured"],
  vintage: ["vintage", "fall", "corduroy", "flannel", "plaid"],
};

const hexToRgb = (hex) => {
  if (typeof hex !== "string") return null;
  const cleaned = hex.replace("#", "");
  if (cleaned.length !== 6) return null;
  const num = parseInt(cleaned, 16);
  if (Number.isNaN(num)) return null;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const colorDistance = (a, b) => {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
};

const matchPalette = (productPalette, userPalette) => {
  if (!Array.isArray(productPalette) || !Array.isArray(userPalette)) return 0;

  const productRgb = productPalette.map(hexToRgb).filter(Boolean);
  const userRgb = userPalette.map(hexToRgb).filter(Boolean);
  if (productRgb.length === 0 || userRgb.length === 0) return 0;

  const minDistances = productRgb.map((p) =>
    userRgb.reduce((min, u) => Math.min(min, colorDistance(p, u)), Infinity)
  );

  const avg = minDistances.reduce((acc, d) => acc + d, 0) / minDistances.length;
  return Math.max(0, 1 - avg / 220);
};

const matchTags = (productTags, silhouette) => {
  if (!Array.isArray(productTags) || !silhouette) return 0;
  const desired = SILHOUETTE_TAG_BOOST[silhouette] || [];
  if (desired.length === 0) return 0;
  const overlap = productTags.filter((tag) =>
    desired.some((d) => String(tag).toLowerCase().includes(d))
  ).length;
  return Math.min(1, overlap / 2);
};

export const scoreProductStyle = (product, styleProfile) => {
  if (!product || !styleProfile) return { score: 0, paletteScore: 0, tagScore: 0 };

  const paletteScore = matchPalette(product.paletteHex || [], styleProfile.palette || []);
  const tagScore = matchTags(product.recommendationTags || [], styleProfile.silhouette);
  const score = paletteScore * 0.65 + tagScore * 0.35;

  return {
    score: Number(score.toFixed(3)),
    paletteScore: Number(paletteScore.toFixed(3)),
    tagScore: Number(tagScore.toFixed(3)),
  };
};

const PALETTE_BUCKET_BY_ID = {
  "earth-tones": "earth",
  monochrome: "monochrome",
  pastels: "neutral",
  "jewel-tones": "jewel",
  "warm-neutrals": "warm",
  "bold-brights": "warm",
  "cool-tones": "cool",
  sunset: "warm",
};

export const scoreProductPreferences = (product, { preferredStyles, preferredPalettes } = {}) => {
  let styleScore = 0;
  let paletteScore = 0;

  if (Array.isArray(preferredStyles) && preferredStyles.length > 0) {
    const productTags = (product?.recommendationTags || []).map((t) => String(t).toLowerCase());
    let bestStyleHits = 0;
    preferredStyles.forEach((styleId) => {
      const wanted = STYLE_TAG_MAP[styleId] || [];
      const hits = wanted.filter((t) => productTags.some((p) => p.includes(t))).length;
      if (hits > bestStyleHits) bestStyleHits = hits;
    });
    styleScore = Math.min(1, bestStyleHits / 2);
  }

  if (Array.isArray(preferredPalettes) && preferredPalettes.length > 0) {
    const productBuckets = new Set(
      (product?.recommendationTags || []).map((t) => String(t).toLowerCase())
    );
    // Match if any preferred palette's bucket name appears in product tags
    // (loose match — products are tagged with descriptors like "warm", "earth").
    const wantedBuckets = preferredPalettes
      .map((id) => PALETTE_BUCKET_BY_ID[id])
      .filter(Boolean);
    const hits = wantedBuckets.filter((b) => productBuckets.has(b)).length;
    paletteScore = Math.min(1, hits / Math.max(1, wantedBuckets.length));
  }

  const score = styleScore * 0.6 + paletteScore * 0.4;
  return {
    score: Number(score.toFixed(3)),
    styleScore: Number(styleScore.toFixed(3)),
    paletteScore: Number(paletteScore.toFixed(3)),
  };
};

export const rankProductsForStyle = (products, styleProfile, sizeRecommender, preferences) => {
  if (!Array.isArray(products)) return [];
  return products
    .map((product) => {
      const style = scoreProductStyle(product, styleProfile);
      const prefs = scoreProductPreferences(product, preferences || {});
      const size = sizeRecommender ? sizeRecommender(product) : null;
      const sizeScore = size?.confidence || 0;
      return {
        product,
        styleScore: style.score,
        prefsScore: prefs.score,
        sizeScore,
        combined: style.score * 0.35 + prefs.score * 0.3 + sizeScore * 0.35,
        size,
        style,
        prefs,
      };
    })
    .sort((a, b) => b.combined - a.combined);
};
