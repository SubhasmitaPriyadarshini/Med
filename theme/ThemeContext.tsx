import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, Theme } from './themes';

// Define the context shape
type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  isUsingDeviceTheme: boolean;
  toggleTheme: () => void;
  toggleDeviceTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  isUsingDeviceTheme: false,
  toggleTheme: () => {},
  toggleDeviceTheme: () => {},
  setTheme: () => {},
});

// Define props for ThemeProvider
type ThemeProviderProps = {
  children: ReactNode;
};



// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    setCurrentTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
  }, [systemColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        isDark: currentTheme.dark,
        isUsingDeviceTheme: true,
        toggleTheme: () => {},
        toggleDeviceTheme: () => {},
        setTheme: () => {},
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; 