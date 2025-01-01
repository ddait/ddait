import { CacheService } from '../cacheService';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('CacheService', () => {
  let cacheService: CacheService;
  const defaultTTL = 1000 * 60; // 1 minute

  beforeEach(() => {
    cacheService = new CacheService({ ttl: defaultTTL, maxSize: 3 });
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should fetch and cache data when not in cache', async () => {
      const mockData = { id: 1, name: 'test' };
      const fetcher = jest.fn().mockResolvedValue(mockData);

      const result = await cacheService.get('test-key', fetcher);

      expect(result).toEqual(mockData);
      expect(fetcher).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.setItem).toHaveBeenCalled();

      const stats = cacheService.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(1);
    });

    it('should return cached data when not expired', async () => {
      const mockData = { id: 1, name: 'test' };
      const fetcher = jest.fn().mockResolvedValue(mockData);

      await cacheService.get('test-key', fetcher);
      const result = await cacheService.get('test-key', fetcher);

      expect(result).toEqual(mockData);
      expect(fetcher).toHaveBeenCalledTimes(1);

      const stats = cacheService.getStats();
      expect(stats.hits).toBe(1);
      expect(stats.misses).toBe(1);
    });

    it('should fetch new data when cache is expired', async () => {
      const mockData = { id: 1, name: 'test' };
      const fetcher = jest.fn().mockResolvedValue(mockData);

      // First fetch with expired TTL
      await cacheService.set('test-key', mockData);
      
      // Wait for cache to expire
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Second fetch
      const result = await cacheService.get('test-key', fetcher, { ttl: 1 }); // 1ms TTL

      expect(result).toEqual(mockData);
      expect(fetcher).toHaveBeenCalledTimes(1);

      const stats = cacheService.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(1);
    });

    it('should force refresh when specified', async () => {
      const mockData = { id: 1, name: 'test' };
      const fetcher = jest.fn().mockResolvedValue(mockData);

      await cacheService.get('test-key', fetcher);
      const result = await cacheService.get('test-key', fetcher, { forceRefresh: true });

      expect(result).toEqual(mockData);
      expect(fetcher).toHaveBeenCalledTimes(2);
    });
  });

  describe('set and invalidate', () => {
    it('should set and retrieve cached data', async () => {
      const mockData = { id: 1, name: 'test' };
      const fetcher = jest.fn().mockResolvedValue('wrong data');

      await cacheService.set('test-key', mockData);
      const result = await cacheService.get('test-key', fetcher);

      expect(result).toEqual(mockData);
      expect(fetcher).not.toHaveBeenCalled();
    });

    it('should invalidate cached data', async () => {
      const mockData = { id: 1, name: 'test' };
      const fetcher = jest.fn().mockResolvedValue('new data');

      await cacheService.set('test-key', mockData);
      await cacheService.invalidate('test-key');
      const result = await cacheService.get('test-key', fetcher);

      expect(result).toBe('new data');
      expect(fetcher).toHaveBeenCalled();
      expect(AsyncStorage.removeItem).toHaveBeenCalled();
    });
  });

  describe('maxSize enforcement', () => {
    it('should remove oldest entries when maxSize is exceeded', async () => {
      const mockData = { id: 1 };
      const fetcher = jest.fn().mockResolvedValue(mockData);

      // Add 4 items to a cache with maxSize 3
      await cacheService.set('key1', { id: 1 });
      await cacheService.set('key2', { id: 2 });
      await cacheService.set('key3', { id: 3 });
      await cacheService.set('key4', { id: 4 });

      const stats = cacheService.getStats();
      expect(stats.size).toBe(3);
      expect(stats.keys).not.toContain('cache:key1');
    });
  });

  describe('clear', () => {
    it('should clear all cached data', async () => {
      const mockData = { id: 1 };
      const fetcher = jest.fn().mockResolvedValue(mockData);

      await cacheService.set('key1', { id: 1 });
      await cacheService.set('key2', { id: 2 });
      await cacheService.clear();

      const stats = cacheService.getStats();
      expect(stats.size).toBe(0);
      expect(stats.keys).toHaveLength(0);
      expect(AsyncStorage.removeItem).toHaveBeenCalled();
    });
  });
}); 