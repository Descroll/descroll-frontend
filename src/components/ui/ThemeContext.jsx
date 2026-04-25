import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
const [theme, setTheme] = useState("default");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme + save it
  useEffect(() => {
    document.body.setAttribute("data-theme", theme.toLowerCase());
    localStorage.setItem("theme", theme);
  }, [theme]);

  const applyTheme = (newThemeName) => {
  setTheme(newThemeName);
};



  return (
    <ThemeContext.Provider value={{ theme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy use
export const useTheme = () => useContext(ThemeContext);