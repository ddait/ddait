import { create } from 'zustand';
import { ColorSchemeName } from 'react-native';

interface ColorSchemeStore {
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
}

const useColorSchemeStore = create<ColorSchemeStore>((set) => ({
  colorScheme: 'light',
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
}));

export function useColorScheme(): ColorSchemeName {
  return useColorSchemeStore((state) => state.colorScheme);
}

export function useColorSchemeActions() {
  const setColorScheme = useColorSchemeStore((state) => state.setColorScheme);
  
  const toggleColorScheme = () => {
    useColorSchemeStore.getState().colorScheme === 'dark' 
      ? setColorScheme('light')
      : setColorScheme('dark');
  };

  return { toggleColorScheme };
}
