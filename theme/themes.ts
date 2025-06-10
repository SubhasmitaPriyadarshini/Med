// Theme color definitions for the app
// Light and dark themes with all color variables

import appColors from '../constant/Colors';

// Define types for stronger typing
export type ThemeColors = {
  // Main brand colors
  primary: {
    main: string;
    light: string;
    dark: string;
    200: string;
  };
  secondary: string;
  
  // UI colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  TextInput:{
    background: string;
  };
  tabIcons:{
    fill: string;
    outline: string;
  };
  brandlogoBackground:{
    background: string;
  }
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  
  // Additional colors
  card: string;
  border: string;
  notification: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Additional shades
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
  };
  borderColor:{
    border: string;
  }
  // Other colors
  white: string;
  black: string;
};

export type Theme = {
  dark: boolean;
  colors: ThemeColors;
};

// Light theme definition
export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: {
      main:  appColors.ButtonLinerGradient1, // Use main brand color from appColors
      light: '#ffffff', // Adjust as needed from Figma
      dark: '#000000', // Adjust as needed from Figma
      200: 'rgba(255, 255, 255, 0.7)',
    },
    secondary: '#0F172A', // Adjust as needed from Figma

    TextInput: {
      background: appColors.inputfieldLight,
    },
    tabIcons:{
      fill: appColors.ButtonLinerGradient1,
      outline: '#9CA3AF', // fallback gray
    },
    brandlogoBackground: {
      background: appColors.inputfieldLight,
    },
    
    background: {
      primary: appColors.backgorundColorLight,
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      tertiary: '#94A3B8',
      inverse: '#FFFFFF',
    },
    
    card: '#FFFFFF',
    border: '#E2E8F0',
    notification: '#FF4D4F',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    gray: {
      50: '#F8FAFC',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
    },
    
    white: '#FFFFFF',
    black: '#000000',
    borderColor:{
      border: '#E5E7EB', // fallback gray
    }
  },
};

// Dark theme definition
export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: {
      main: appColors.ButtonLinerGradient1, // Use main brand color from appColors
      light: '#ffffff', // Adjust as needed from Figma
      dark: '#000000', // Adjust as needed from Figma
      200: 'rgba(255, 255, 255, 0.7)',
    },
    secondary: appColors.selecteditemDark, // Use from appColors
    
    background: {
      primary: appColors.backgroundColorDark, // Use from appColors
      secondary: '#1E293B',
      tertiary: '#334155',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#E2E8F0',
      tertiary: '#94A3B8',
      inverse: '#0F172A',
    },
    TextInput:{
      background: appColors.inputfieldDark,
    },
    tabIcons:{
      fill:  appColors.ButtonLinerGradient1,
      outline: '#6B7280', // fallback gray
    },
    brandlogoBackground: {
      background: appColors.selecteditemDark,
    },
    card: '#1E293B',
    border: '#334155',
    notification: '#FF4D4F',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    gray: {
      50: '#F8FAFC',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
    },
    
    white: '#FFFFFF',
    black: '#000000',
    borderColor:{
      border: '#374151', // fallback gray
    }
  },
};

// Default theme is light
export default lightTheme; 