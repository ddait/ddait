import AsyncStorage from '@react-native-async-storage/async-storage';
import { CacheConfig, CacheEntry, CacheOptions, CacheStats } from './types';

export class CacheService {
  private cache: Map<string, CacheEntry<any>>;
  private stats: CacheStats;

  constructor(private readonly config: CacheConfig) {
    this.cache = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      size: 0,
      keys: []
    };
    this.updateStats();
  }

  async get<T>(key: string, fetcher: () => Promise<T>, options?: CacheOptions): Promise<T> {
    const cacheKey = this.getCacheKey(key);
    const ttl = options?.ttl ?? this.config.ttl;

    if (options?.forceRefresh) {
      this.stats.misses++;
      const data = await fetcher();
      await this.set(key, data);
      return data;
    }

    const cached = this.cache.get(cacheKey);
    if (cached && !this.isExpired(cached, ttl)) {
      this.stats.hits++;
      return cached.data as T;
    }

    this.stats.misses++;
    const data = await fetcher();
    await this.set(key, data);
    return data;
  }

  async set<T>(key: string, data: T): Promise<void> {
    const cacheKey = this.getCacheKey(key);
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      key: cacheKey
    };

    this.cache.set(cacheKey, entry);
    await this.persistToStorage(cacheKey, entry);
    this.enforceMaxSize();
  }

  async invalidate(key: string): Promise<void> {
    const cacheKey = this.getCacheKey(key);
    this.cache.delete(cacheKey);
    try {
      await AsyncStorage.removeItem(cacheKey);
    } catch (error) {
      console.error('Failed to remove cache entry:', error);
    }
    this.updateStats();
  }

  async clear(): Promise<void> {
    const keys = Array.from(this.cache.keys());
    this.cache.clear();
    try {
      await Promise.all(keys.map(key => AsyncStorage.removeItem(key)));
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
    this.updateStats();
  }

  getStats(): CacheStats {
    return { ...this.stats };
  }

  private isExpired(entry: CacheEntry<any>, ttl: number): boolean {
    if (ttl <= 0) return true;
    return Date.now() - entry.timestamp > ttl;
  }

  private getCacheKey(key: string): string {
    return `cache:${key}`;
  }

  private enforceMaxSize(): void {
    if (!this.config.maxSize || this.cache.size <= this.config.maxSize) {
      return;
    }

    const entriesToRemove = this.cache.size - this.config.maxSize;
    const entries = Array.from(this.cache.entries())
      .sort(([, a], [, b]) => a.timestamp - b.timestamp);

    for (let i = 0; i < entriesToRemove; i++) {
      const [key] = entries[i];
      this.cache.delete(key);
      try {
        AsyncStorage.removeItem(key);
      } catch (error) {
        console.error('Failed to remove cache entry:', error);
      }
    }

    this.updateStats();
  }

  private async persistToStorage(key: string, entry: CacheEntry<any>): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error('Failed to persist cache entry:', error);
    }
  }

  private updateStats(): void {
    this.stats.size = this.cache.size;
    this.stats.keys = Array.from(this.cache.keys());
  }
} 