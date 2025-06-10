import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * Custom hook to access the current theme and theme functions throughout the app
 * 
 * @returns Theme context containing current theme, dark mode status, and theme switcher functions
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}; 