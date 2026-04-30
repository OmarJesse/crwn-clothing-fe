import light from "./light";
import dark from "./dark";
import sunset from "./sunset";

export const THEMES = { light, dark, sunset };
export const THEME_NAMES = Object.keys(THEMES);

export const THEME_LABELS = {
  light: { icon: "☀️", label: "Light" },
  dark: { icon: "🌙", label: "Dark" },
  sunset: { icon: "🌅", label: "Sunset" },
};

export const getTheme = (name) => THEMES[name] || THEMES.light;
export const nextThemeName = (name) => {
  const idx = THEME_NAMES.indexOf(name);
  return THEME_NAMES[(idx + 1) % THEME_NAMES.length];
};

export { light, dark, sunset };
export default light;
