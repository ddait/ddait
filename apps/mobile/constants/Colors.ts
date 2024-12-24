/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    // Primary Colors
    primary: '#FF4B4B',
    primaryBlue: '#4B7BFF',
    primaryGreen: '#34C759',

    // Secondary Colors
    secondaryPurple: '#9B51E0',
    secondaryOrange: '#FF9F2D',
    secondaryTeal: '#2DC8C8',

    // Neutral Colors
    text: '#212529',
    background: '#FFFFFF',
    white: '#FFFFFF',
    gray: {
      100: '#F8F9FA',
      200: '#E9ECEF',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#6C757D',
      700: '#495057',
      800: '#343A40',
      900: '#212529',
    },

    // Semantic Colors
    success: '#34C759',
    error: '#FF4B4B',
    warning: '#FF9F2D',
    info: '#4B7BFF',

    // System Colors
    tint: '#FF4B4B',
    tabIconDefault: '#CCCCCC',
    tabIconSelected: '#FF4B4B',
    icon: '#000000',
  },
  dark: {
    // Primary Colors
    primary: '#FF6B6B',
    primaryBlue: '#6B8FFF',
    primaryGreen: '#4CD964',

    // Secondary Colors
    secondaryPurple: '#B57BE0',
    secondaryOrange: '#FFB74D',
    secondaryTeal: '#4DD0D0',

    // Neutral Colors
    text: '#F8F9FA',
    background: '#000000',
    white: '#FFFFFF',
    gray: {
      900: '#F8F9FA',
      800: '#E9ECEF',
      700: '#DEE2E6',
      600: '#CED4DA',
      500: '#ADB5BD',
      400: '#868E96',
      300: '#3D4348',
      200: '#2A2F34',
      100: '#212529',
    },

    // Semantic Colors
    success: '#4CD964',
    error: '#FF6B6B',
    warning: '#FFB74D',
    info: '#6B8FFF',

    // System Colors
    tint: '#FF6B6B',
    tabIconDefault: '#666666',
    tabIconSelected: '#FF6B6B',
    icon: '#FFFFFF',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
