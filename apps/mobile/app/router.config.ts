import { ExpoConfig } from 'expo/config';

export default {
  screens: {
    '(tabs)': {
      initialRouteName: 'index',
      screens: {
        social: 'social',
        profile: 'profile',
        index: '',
        workout: 'workout',
        competition: 'competition',
      },
    },
  },
}; 
