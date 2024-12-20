import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

interface CustomRequest extends Request {
  user?: {
    id: string;
    [key: string]: any;
  };
}

@Injectable()
export class MobileCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const cacheKey = this.generateCacheKey(request);

    // 캐시된 데이터 확인
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      return of(cachedData);
    }

    // 새로운 데이터 처리 및 캐싱
    return next.handle().pipe(
      tap(async (data) => {
        const ttl = this.getTTL(request.path);
        await this.cacheManager.set(cacheKey, data, ttl);
      })
    );
  }

  private generateCacheKey(request: CustomRequest): string {
    const { method, path, query, body } = request;
    const userId = request.user?.id || 'anonymous';
    
    return `${method}:${path}:${userId}:${JSON.stringify(query)}:${JSON.stringify(body)}`;
  }

  private getTTL(path: string): number {
    // 엔드포인트별 TTL 설정
    const ttlMap: Record<string, number> = {
      '/api/exercise/sessions': 300,    // 5분
      '/api/competitions': 60,          // 1분
      '/api/social/feed': 180,          // 3분
      '/api/profile': 600               // 10분
    };

    return ttlMap[path] || 300; // 기본 5분
  }
} 