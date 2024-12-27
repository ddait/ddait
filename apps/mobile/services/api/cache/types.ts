export interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items in cache
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  key: string;
}

export interface CacheOptions {
  ttl?: number;
  forceRefresh?: boolean;
}

export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  keys: string[];
} 