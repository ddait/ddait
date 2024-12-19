/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: '#FF4B4B',
    tabIconDefault: '#CCCCCC',
    tabIconSelected: '#FF4B4B',
    icon: '#000000',
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: '#FF6B6B',
    tabIconDefault: '#666666',
    tabIconSelected: '#FF6B6B',
    icon: '#FFFFFF',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
