export const surface = (t) => t?.colors?.semantic?.background?.surface || "#ffffff";
export const elevated = (t) => t?.colors?.semantic?.background?.elevated || "#ffffff";
export const pageBg = (t) => t?.colors?.semantic?.background?.primary || "#f8fafc";
export const overlay = (t) => t?.colors?.semantic?.background?.overlay || "rgba(15,23,42,0.5)";

export const textPrimary = (t) => t?.colors?.semantic?.text?.primary || "#0f172a";
export const textSecondary = (t) => t?.colors?.semantic?.text?.secondary || "#475569";
export const textMuted = (t) => t?.colors?.semantic?.text?.muted || "#94a3b8";
export const textInverse = (t) => t?.colors?.semantic?.text?.inverse || "#ffffff";

export const borderSubtle = (t) => t?.colors?.semantic?.border?.subtle || "rgba(148,163,184,0.18)";
export const borderBase = (t) => t?.colors?.semantic?.border?.base || "rgba(148,163,184,0.32)";
export const borderStrong = (t) => t?.colors?.semantic?.border?.strong || "rgba(71,85,105,0.5)";

export const primary = (t) => t?.colors?.primary?.main || "#6366F1";
export const primaryLight = (t) => t?.colors?.primary?.light || "#818CF8";
export const primaryDark = (t) => t?.colors?.primary?.dark || "#4F46E5";
export const primaryGradient = (t) =>
  t?.colors?.primary?.gradientAlt || "linear-gradient(135deg, #6366F1, #8B5CF6)";

export const secondary = (t) => t?.colors?.secondary?.main || "#EC4899";
export const accent = (t) => t?.colors?.accent?.main || "#10B981";

export const successColor = (t) => t?.colors?.semantic?.success || "#10B981";
export const warningColor = (t) => t?.colors?.semantic?.warning || "#F59E0B";
export const errorColor = (t) => t?.colors?.semantic?.error || "#EF4444";
export const infoColor = (t) => t?.colors?.semantic?.info || "#3B82F6";

// Returns "rgba" for a hex color with given alpha (0-1).
export const alpha = (hex, a) => {
  if (typeof hex !== "string" || hex[0] !== "#") return hex;
  const v = hex.length === 4
    ? hex.slice(1).split("").map((c) => parseInt(c + c, 16))
    : [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
  return `rgba(${v[0]}, ${v[1]}, ${v[2]}, ${a})`;
};
