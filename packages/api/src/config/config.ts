import { Env } from './environment';

interface AppConfig {
  cors: {
    origin: string[];
    credentials: boolean;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
  cache: {
    ttl: number;
  };
}

export function getConfig(env: Env): AppConfig {
  const configs: Record<string, AppConfig> = {
    development: {
      cors: {
        origin: ['http://localhost:3000'],
        credentials: true
      },
      rateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 100
      },
      cache: {
        ttl: 60
      }
    },
    staging: {
      cors: {
        origin: ['https://staging.ddait.com'],
        credentials: true
      },
      rateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 100
      },
      cache: {
        ttl: 300
      }
    },
    production: {
      cors: {
        origin: ['https://ddait.com'],
        credentials: true
      },
      rateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 50
      },
      cache: {
        ttl: 600
      }
    }
  };

  return configs[env.NODE_ENV];
} 