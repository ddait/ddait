import '@testing-library/jest-native/extend-expect';

// Mock Expo Font
jest.mock('expo-font', () => ({
  isLoaded: jest.fn(() => true),
  loadAsync: jest.fn(),
}));

// Mock Vector Icons
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: '',
}));

// Mock Safe Area Context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));