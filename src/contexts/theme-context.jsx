import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { getTheme, nextThemeName, THEME_NAMES } from "../styles/themes";

const STORAGE_KEY = "crwn-theme";
const ThemeContext = createContext(null);

const readInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && THEME_NAMES.includes(stored)) return stored;
  if (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches) return "dark";
  return "light";
};

const applyCssVars = (theme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", theme.name);
  Object.entries(theme.cssVars || {}).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(readInitialTheme);

  const theme = useMemo(() => getTheme(themeName), [themeName]);

  useEffect(() => {
    applyCssVars(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, themeName);
    } catch {
      /* noop */
    }
  }, [theme, themeName]);

  const setTheme = useCallback((next) => {
    if (THEME_NAMES.includes(next)) setThemeName(next);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeName((current) => nextThemeName(current));
  }, []);

  const value = useMemo(
    () => ({ themeName, theme, setTheme, cycleTheme, themes: THEME_NAMES }),
    [themeName, theme, setTheme, cycleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
