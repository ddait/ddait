// Colors
export const colors = {
  primary: {
    red: '#FF4B4B',
    blue: '#4B7BFF',
    green: '#34C759',
  },
  secondary: {
    purple: '#9B51E0',
    orange: '#FF9F2D',
    teal: '#2DC8C8',
  },
  neutral: {
    100: '#FFFFFF',
    200: '#F8F9FA',
    300: '#E9ECEF',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#6C757D',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },
  semantic: {
    success: '#34C759',
    error: '#FF4B4B',
    warning: '#FF9F2D',
    info: '#4B7BFF',
  },
};

// Typography
type FontWeight = '400' | '500' | '600' | '700' | 'normal' | 'bold';

export const typography = {
  h1: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as FontWeight,
  },
  h2: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700' as FontWeight,
  },
  h3: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600' as FontWeight,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as FontWeight,
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as FontWeight,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as FontWeight,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as FontWeight,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Border Radius
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Z-Index
export const zIndex = {
  base: 0,
  above: 1,
  below: -1,
  modal: 100,
  toast: 200,
  tooltip: 300,
};

export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  zIndex,
}; 