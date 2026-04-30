import { composeTheme } from "./base";

const colors = {
  primary: {
    main: "#818CF8",
    light: "#A5B4FC",
    dark: "#6366F1",
    gradient: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
    gradientAlt: "linear-gradient(135deg, #818CF8 0%, #C4B5FD 100%)",
  },
  secondary: {
    main: "#F472B6",
    light: "#F9A8D4",
    dark: "#EC4899",
    gradient: "linear-gradient(135deg, #c026d3 0%, #db2777 100%)",
  },
  accent: {
    main: "#34D399",
    light: "#6EE7B7",
    dark: "#10B981",
  },

  success: "#34D399",
  warning: "#FBBF24",
  error: "#F87171",
  info: "#60A5FA",
  background: { default: "#020617", paper: "#0F172A", dark: "#000000" },
  text: { primary: "#E2E8F0", secondary: "#94A3B8", disabled: "#475569", inverse: "#0F172A" },

  semantic: {
    background: {
      primary: "#020617",
      surface: "#0F172A",
      elevated: "#1E293B",
      overlay: "rgba(2, 6, 23, 0.7)",
    },
    text: {
      primary: "#E2E8F0",
      secondary: "#94A3B8",
      muted: "#64748B",
      inverse: "#0F172A",
    },
    border: {
      subtle: "rgba(148, 163, 184, 0.12)",
      base: "rgba(148, 163, 184, 0.22)",
      strong: "rgba(148, 163, 184, 0.4)",
    },
    success: "#34D399",
    warning: "#FBBF24",
    error: "#F87171",
    info: "#60A5FA",
  },
};

const glass = {
  light: `
    background: rgba(30, 41, 59, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(148, 163, 184, 0.15);
  `,
  medium: `
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(148, 163, 184, 0.18);
  `,
  dark: `
    background: rgba(2, 6, 23, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(148, 163, 184, 0.1);
  `,
};

const cssVars = {
  "--color-primary": "#e2e8f0",
  "--color-primary-light": "#cbd5e1",
  "--color-primary-dark": "#94a3b8",
  "--color-secondary": "#a5b4fc",
  "--color-accent": "#38bdf8",
  "--color-background": "#020617",
  "--color-surface": "#0f172a",
  "--color-text": "#e2e8f0",
  "--color-text-secondary": "#94a3b8",
  "--body-gradient-start": "#020617",
  "--body-gradient-end": "#0f172a",
};

export default composeTheme({
  name: "dark",
  colors,
  glass,
  coloredShadow: {
    base: "0 10px 40px -10px rgba(129, 140, 248, 0.45)",
    hover: "0 20px 60px -10px rgba(129, 140, 248, 0.55)",
  },
  cssVars,
});
