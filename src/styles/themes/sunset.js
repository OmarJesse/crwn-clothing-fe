import { composeTheme } from "./base";

const colors = {
  primary: {
    main: "#FB7185",
    light: "#FDA4AF",
    dark: "#E11D48",
    gradient: "linear-gradient(135deg, #fb923c 0%, #db2777 100%)",
    gradientAlt: "linear-gradient(135deg, #FB7185 0%, #F97316 100%)",
  },
  secondary: {
    main: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
    gradient: "linear-gradient(135deg, #f97316 0%, #facc15 100%)",
  },
  accent: {
    main: "#A855F7",
    light: "#C084FC",
    dark: "#7E22CE",
  },

  success: "#84CC16",
  warning: "#F59E0B",
  error: "#DC2626",
  info: "#0EA5E9",
  background: { default: "#FFF7ED", paper: "#FFFBEB", dark: "#451A03" },
  text: { primary: "#431407", secondary: "#7C2D12", disabled: "#A8A29E", inverse: "#FFFBEB" },

  semantic: {
    background: {
      primary: "#FFF7ED",
      surface: "#FFFBEB",
      elevated: "#FFFFFF",
      overlay: "rgba(67, 20, 7, 0.45)",
    },
    text: {
      primary: "#431407",
      secondary: "#7C2D12",
      muted: "#A8A29E",
      inverse: "#FFFBEB",
    },
    border: {
      subtle: "rgba(251, 113, 133, 0.18)",
      base: "rgba(251, 113, 133, 0.32)",
      strong: "rgba(225, 29, 72, 0.45)",
    },
    success: "#84CC16",
    warning: "#F59E0B",
    error: "#DC2626",
    info: "#0EA5E9",
  },
};

const glass = {
  light: `
    background: rgba(255, 251, 235, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(251, 113, 133, 0.18);
  `,
  medium: `
    background: rgba(255, 247, 237, 0.6);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(251, 113, 133, 0.22);
  `,
  dark: `
    background: rgba(67, 20, 7, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(251, 191, 36, 0.18);
  `,
};

const cssVars = {
  "--color-primary": "#431407",
  "--color-primary-light": "#7C2D12",
  "--color-primary-dark": "#1C0701",
  "--color-secondary": "#FB7185",
  "--color-accent": "#F59E0B",
  "--color-background": "#FFF7ED",
  "--color-surface": "#FFFBEB",
  "--color-text": "#431407",
  "--color-text-secondary": "#7C2D12",
  "--body-gradient-start": "#FFF7ED",
  "--body-gradient-end": "#FFE4C7",
};

export default composeTheme({
  name: "sunset",
  colors,
  glass,
  coloredShadow: {
    base: "0 10px 40px -10px rgba(251, 113, 133, 0.45)",
    hover: "0 20px 60px -10px rgba(251, 113, 133, 0.55)",
  },
  cssVars,
});
