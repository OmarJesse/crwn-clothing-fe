// Single source of truth — used by the wizard step, the recommendation
// scoring, and (eventually) anywhere else preferences are displayed.

export const STYLE_OPTIONS = [
  {
    id: "minimalist",
    label: "Minimalist",
    description: "Clean lines, neutral tones",
    emoji: "◻️",
    matchTags: ["tailored", "structured", "minimal", "smart-casual"],
  },
  {
    id: "streetwear",
    label: "Streetwear",
    description: "Urban, casual, bold",
    emoji: "🛹",
    matchTags: ["casual", "bold", "oversized", "athletic", "athleisure"],
  },
  {
    id: "classic",
    label: "Classic",
    description: "Timeless and tailored",
    emoji: "👔",
    matchTags: ["smart-casual", "tailored", "structured", "polo"],
  },
  {
    id: "bohemian",
    label: "Bohemian",
    description: "Flowing, eclectic, layered",
    emoji: "🌿",
    matchTags: ["flowing", "draped", "linen", "wide-leg", "summer"],
  },
  {
    id: "sporty",
    label: "Sporty",
    description: "Active and athleisure",
    emoji: "🏃",
    matchTags: ["athletic", "active", "athleisure", "joggers"],
  },
  {
    id: "edgy",
    label: "Edgy",
    description: "Bold, biker, high-contrast",
    emoji: "🖤",
    matchTags: ["fitted", "bold", "premium", "biker"],
  },
  {
    id: "preppy",
    label: "Preppy",
    description: "Polished smart-casual",
    emoji: "🎓",
    matchTags: ["smart-casual", "polo", "tailored", "structured"],
  },
  {
    id: "vintage",
    label: "Vintage",
    description: "Retro, nostalgic, fall",
    emoji: "📻",
    matchTags: ["vintage", "fall", "corduroy", "flannel", "plaid"],
  },
];

export const PALETTE_OPTIONS = [
  {
    id: "earth-tones",
    label: "Earth Tones",
    description: "Browns, tans, olives",
    swatches: ["#8B5A2B", "#C8A678", "#7A6B3A", "#4A3219"],
    bucket: "earth",
  },
  {
    id: "monochrome",
    label: "Monochrome",
    description: "Black, white, gray",
    swatches: ["#0F172A", "#475569", "#CBD5E1", "#FFFFFF"],
    bucket: "monochrome",
  },
  {
    id: "pastels",
    label: "Pastels",
    description: "Soft mint, blush, lavender",
    swatches: ["#A7F3D0", "#FBCFE8", "#DDD6FE", "#FDE68A"],
    bucket: "neutral",
  },
  {
    id: "jewel-tones",
    label: "Jewel Tones",
    description: "Emerald, sapphire, ruby",
    swatches: ["#065F46", "#1E3A8A", "#9F1239", "#7C2D12"],
    bucket: "jewel",
  },
  {
    id: "warm-neutrals",
    label: "Warm Neutrals",
    description: "Beige, cream, camel",
    swatches: ["#F5DEB3", "#D2B48C", "#B89D6F", "#8B6F47"],
    bucket: "warm",
  },
  {
    id: "bold-brights",
    label: "Bold Brights",
    description: "Saturated reds, blues, yellows",
    swatches: ["#DC2626", "#2563EB", "#FACC15", "#16A34A"],
    bucket: "warm",
  },
  {
    id: "cool-tones",
    label: "Cool Tones",
    description: "Navy, ice blue, charcoal",
    swatches: ["#1E293B", "#0EA5E9", "#94A3B8", "#0F766E"],
    bucket: "cool",
  },
  {
    id: "sunset",
    label: "Sunset",
    description: "Orange, pink, gold",
    swatches: ["#F97316", "#EC4899", "#F59E0B", "#FB7185"],
    bucket: "warm",
  },
];

export const STYLE_BY_ID = Object.fromEntries(STYLE_OPTIONS.map((s) => [s.id, s]));
export const PALETTE_BY_ID = Object.fromEntries(PALETTE_OPTIONS.map((p) => [p.id, p]));
