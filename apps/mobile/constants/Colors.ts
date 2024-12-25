/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

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
    text: '#000',
    background: '#fff',
    cardBackground: '#fff',
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      100: '#F7F7F7',
      200: '#E5E5E5',
      300: '#D4D4D4',
      400: '#A3A3A3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },

    // Semantic Colors
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',

    // System Colors
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    icon: '#000000',
  },
  dark: {
    // Primary Colors
    primary: '#FF4B4B',
    primaryBlue: '#4B7BFF',
    primaryGreen: '#34C759',

    // Secondary Colors
    secondaryPurple: '#9B51E0',
    secondaryOrange: '#FF9F2D',
    secondaryTeal: '#2DC8C8',

    // Neutral Colors
    text: '#fff',
    background: '#000',
    cardBackground: '#1c1c1e',
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      100: '#171717',
      200: '#262626',
      300: '#404040',
      400: '#525252',
      500: '#737373',
      600: '#A3A3A3',
      700: '#D4D4D4',
      800: '#E5E5E5',
      900: '#F7F7F7',
    },

    // Semantic Colors
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',

    // System Colors
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    icon: '#FFFFFF',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
