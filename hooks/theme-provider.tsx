import { ThemeProps } from "@/constants/types";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { createContext, useContext } from "react";

type SchemeOptions = "light" | "dark" | "automatic";

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
  const { colors, theme, toggleTheme } = useThemeColor();

  return (
    <ThemeContext.Provider value={{ colors, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  // if (!context) {
  //   throw new Error('useTheme must be used within a ThemeProvider');
  // }
  return context;
};
