import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Ddait2',
  slug: 'ddait2',
  version: '1.0.0',
  scheme: 'ddait2',
  web: {
    bundler: 'metro',
  },
  plugins: [
    'expo-router',
  ],
  updates: {
    url: 'https://u.expo.dev/your-project-id',
  },
  extra: {
    router: {
      origin: false,
      // Only show defined tab routes in navigation
      allowedRoutes: [
        '/',
        '/workout',
        '/competition',
        '/social',
        '/profile',
        '/workout/setup',
        '/workout/session',
        '/workout/complete',
      ],
    },
  },
}); 