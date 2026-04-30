import { composeTheme } from "./base";

const colors = {
  primary: {
    main: "#6366F1",
    light: "#818CF8",
    dark: "#4F46E5",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    gradientAlt: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  },
  secondary: {
    main: "#EC4899",
    light: "#F472B6",
    dark: "#DB2777",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  accent: {
    main: "#10B981",
    light: "#34D399",
    dark: "#059669",
  },

  // legacy aliases (consumed by older components)
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  background: { default: "#FFFFFF", paper: "#F9FAFB", dark: "#0F172A" },
  text: { primary: "#111827", secondary: "#6B7280", disabled: "#9CA3AF", inverse: "#FFFFFF" },

  semantic: {
    background: {
      primary: "#F8FAFC",
      surface: "#FFFFFF",
      elevated: "#FFFFFF",
      overlay: "rgba(15, 23, 42, 0.5)",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
      muted: "#94A3B8",
      inverse: "#FFFFFF",
    },
    border: {
      subtle: "rgba(148, 163, 184, 0.18)",
      base: "rgba(148, 163, 184, 0.32)",
      strong: "rgba(71, 85, 105, 0.5)",
    },
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",
  },
};

const glass = {
  light: `
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  `,
  medium: `
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `,
  dark: `
    background: rgba(17, 24, 39, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  `,
};

const cssVars = {
  "--color-primary": "#0f172a",
  "--color-primary-light": "#1e293b",
  "--color-primary-dark": "#020617",
  "--color-secondary": "#6366f1",
  "--color-accent": "#0ea5e9",
  "--color-background": "#f8fafc",
  "--color-surface": "#ffffff",
  "--color-text": "#0f172a",
  "--color-text-secondary": "#475569",
  "--body-gradient-start": "#f8fafc",
  "--body-gradient-end": "#f1f5f9",
};

export default composeTheme({
  name: "light",
  colors,
  glass,
  coloredShadow: {
    base: "0 10px 40px -10px rgba(99, 102, 241, 0.4)",
    hover: "0 20px 60px -10px rgba(99, 102, 241, 0.5)",
  },
  cssVars,
});
