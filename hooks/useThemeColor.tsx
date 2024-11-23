import { Themes } from "@/constants/Colors";
import { ThemeProps } from "@/constants/types";
import { Storage } from "@/store/secure";
import React, { createContext, useContext } from "react";
import { StatusBar, useColorScheme } from "react-native";

type SchemeOptions = "light" | "dark" | "automatic";

export const getTheme = (): "light" | "dark" =>
  useColorScheme() === "light" ? "light" : "dark";

export function _useThemeColor(): {
  colors: ThemeProps;
  theme: SchemeOptions;
  toggleTheme: (_theme: SchemeOptions) => void;
} {
  let colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<"light" | "dark">(getTheme());

  const toggleTheme = (_theme: SchemeOptions) => {
    let nextTheme: "dark" | "light";
    if (_theme === "automatic") {
      nextTheme = colorScheme === "dark" ? "dark" : "light";
    } else {
      nextTheme = _theme;
    }
    if (nextTheme === "dark") {
      StatusBar.setBarStyle("light-content");
    } else {
      StatusBar.setBarStyle("dark-content");
    }
    setTheme(nextTheme);
    Storage.save("@ThemeSettings", _theme);
  };

  return {
    colors: Themes[theme],
    theme,
    toggleTheme,
  };
}

interface ThemeContextProps {
  colors: ThemeProps;
  theme: SchemeOptions;
  toggleTheme: (_theme: SchemeOptions) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use the existing useThemeColor hook to handle theme logic
  const { colors, theme, toggleTheme } = _useThemeColor();

  return (
    <ThemeContext.Provider value={{ colors, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the ThemeContext
export const useThemeColor = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
