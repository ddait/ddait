import { ExpoConfig } from 'expo/config';

export default {
  screens: {
    '(tabs)': {
      initialRouteName: 'index',
      screens: {
        social: {
          screens: {
            index: '',
            'chat/index': 'chat',
            'chat/[id]': 'chat/:id',
            'notifications/index': 'notifications',
            '[id]/index': ':id',
          },
        },
        profile: 'profile',
        index: '',
        workout: 'workout',
        competition: 'competition',
      },
    },
  },
}; 
