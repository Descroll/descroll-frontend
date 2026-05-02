import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../../api";

const ThemeContext = createContext(null);

function applyCssVars(cssVars){
  if (!cssVars) return;
  const root = document.documentElement;
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export const ThemeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("descroll_token");
    if (!token) return;

    apiFetch('/me/themes/active')
      .then((res) => (res.ok ? res.json() : null))
      .then((theme) => {
        if (theme?.css_vars) {
          applyCssVars(theme.css_vars);
          setActiveTheme(theme);
        }
      })
      .catch(() => {});
  }, []);

  const applyTheme = (theme) => {
    if (theme?.css_vars) {
      applyCssVars(theme.css_vars);
      setActiveTheme(theme);
    }
  };

  const resetTheme = () => {
    const root = document.documentElement;
    const defaults = {
      '--color-bg': '#f0f0f0',
      '--color-card': '#e6e6e6',
      '--color-accent': '#7f85ff',
      '--color-text': '#1a1a1a',
      '--color-text-secondary': '#555555',
      '--color-border': '#cccccc',
    };
    Object.entries(defaults).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    setActiveTheme(null);
  }

  return (
    <ThemeContext.Provider value={{ activeTheme, applyTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy use
export const useTheme = () => useContext(ThemeContext);