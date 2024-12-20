import { registerAs } from '@nestjs/config';

export default registerAs('mobileBff', () => ({
  // 캐시 설정
  cache: {
    ttl: parseInt(process.env.MOBILE_CACHE_TTL, 10) || 300, // 기본 5분
    max: parseInt(process.env.MOBILE_CACHE_MAX_ITEMS, 10) || 100,
  },
  
  // 이미지 최적화 설정
  image: {
    defaultQuality: parseInt(process.env.MOBILE_IMAGE_QUALITY, 10) || 80,
    defaultWidth: parseInt(process.env.MOBILE_IMAGE_WIDTH, 10) || 300,
    cdnUrl: process.env.MOBILE_IMAGE_CDN_URL || '',
  },
  
  // 배터리 최적화 설정
  battery: {
    lowThreshold: parseInt(process.env.MOBILE_BATTERY_LOW_THRESHOLD, 10) || 15,
    mediumThreshold: parseInt(process.env.MOBILE_BATTERY_MEDIUM_THRESHOLD, 10) || 30,
  },
  
  // 네트워크 최적화 설정
  network: {
    compressionThreshold: parseInt(process.env.MOBILE_NETWORK_COMPRESSION_THRESHOLD, 10) || 1024, // bytes
    defaultPageSize: parseInt(process.env.MOBILE_NETWORK_PAGE_SIZE, 10) || 20,
    maxPageSize: parseInt(process.env.MOBILE_NETWORK_MAX_PAGE_SIZE, 10) || 100,
  },
  
  // 응답 최적화 설정
  response: {
    enableCompression: process.env.MOBILE_RESPONSE_COMPRESSION === 'true',
    compressionLevel: parseInt(process.env.MOBILE_RESPONSE_COMPRESSION_LEVEL, 10) || 6,
    minCompressSize: parseInt(process.env.MOBILE_RESPONSE_MIN_COMPRESS_SIZE, 10) || 1024, // bytes
  },
  
  // 성능 모니터링 설정
  monitoring: {
    enableMetrics: process.env.MOBILE_MONITORING_METRICS === 'true',
    metricsInterval: parseInt(process.env.MOBILE_MONITORING_INTERVAL, 10) || 60000, // ms
  },
  
  // 에러 처리 설정
  error: {
    detailedErrors: process.env.NODE_ENV !== 'production',
    logErrors: true,
    errorResponseFormat: process.env.MOBILE_ERROR_FORMAT || 'json',
  },
  
  // 보안 설정
  security: {
    rateLimit: {
      windowMs: parseInt(process.env.MOBILE_RATE_LIMIT_WINDOW, 10) || 900000, // 15분
      max: parseInt(process.env.MOBILE_RATE_LIMIT_MAX, 10) || 100,
    },
    cors: {
      enabled: process.env.MOBILE_CORS_ENABLED === 'true',
      origin: process.env.MOBILE_CORS_ORIGIN || '*',
    },
  },
})); 