import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class MobileCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const cacheKey = this.generateCacheKey(request);
    
    // 캐시된 데이터 확인
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    // TTL 설정 (기본값: 5분)
    const ttl = this.getTTL(request);

    return next.handle().pipe(
      tap(async response => {
        // 응답 데이터 캐시 저장
        await this.cacheManager.set(cacheKey, response, ttl);
        
        // 메타데이터��� 캐시 정보 추가
        if (response?.meta) {
          response.meta.cache = {
            ttl,
            key: cacheKey
          };
        }
      })
    );
  }

  private generateCacheKey(request: Request): string {
    const { method, originalUrl, query, body } = request;
    
    // 사용자별 캐시키 생성 (인증된 요청의 경우)
    const userId = request.user?.id || 'anonymous';
    
    // 요청 데이터를 포함한 캐시키 생성
    const key = `${method}:${originalUrl}:${userId}:${JSON.stringify(query)}:${JSON.stringify(body)}`;
    
    return Buffer.from(key).toString('base64');
  }

  private getTTL(request: Request): number {
    // 엔드포인트별 TTL 설정
    const ttlMap = {
      '/api/exercise/sessions': 300, // 5분
      '/api/competitions': 60, // 1분
      '/api/profiles': 600, // 10분
      '/api/achievements': 3600, // 1시간
    };

    // URL 패턴 매칭
    for (const [pattern, ttl] of Object.entries(ttlMap)) {
      if (request.originalUrl.startsWith(pattern)) {
        return ttl;
      }
    }

    // 기본 TTL: 5분
    return 300;
  }
} 