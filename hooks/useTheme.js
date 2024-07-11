import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { darkTheme, getTheme, lightTheme, setTheme } from "../theming";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeMode] = useState(lightTheme);

  useEffect(() => {
    const fetchTheme = async () => {
      const currentTheme = await getTheme();
      setThemeMode(currentTheme === "dark" ? darkTheme : lightTheme);
    };
    fetchTheme();
  }, []);

  const ChangeTheme = async (themeName) => {
    setThemeMode(themeName === "dark" ? darkTheme : lightTheme);
    await setTheme(themeName);
  };

  // const appliedTheme = currentTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, ChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
