import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T> {
  data: T;
  meta?: {
    timestamp: number;
    version: string;
    cache?: {
      ttl: number;
      key: string;
    };
  };
}

@Injectable()
export class MobileResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // 응답 시작 시간 기록
    const startTime = Date.now();
    
    return next.handle().pipe(
      map(data => {
        // 응답 데이터 최적화
        const optimizedData = this.optimizeForMobile(data);
        
        // 메타데이터 추가
        return {
          data: optimizedData,
          meta: {
            timestamp: startTime,
            version: '1.0',
            // 캐시 정보는 CacheInterceptor에서 추가
          }
        };
      }),
    );
  }

  private optimizeForMobile(data: any): any {
    if (!data) return data;

    // 배열인 경우 각 항목 최적화
    if (Array.isArray(data)) {
      return data.map(item => this.optimizeForMobile(item));
    }

    // 객체인 경우
    if (typeof data === 'object') {
      const optimized = {};

      // 이미지 URL 최적화
      if (data.imageUrl) {
        optimized['imageUrl'] = this.optimizeImageUrl(data.imageUrl);
      }

      // 날짜 형식 최적화 (Unix timestamp로 변환)
      if (data.createdAt) {
        optimized['createdAt'] = new Date(data.createdAt).getTime();
      }
      if (data.updatedAt) {
        optimized['updatedAt'] = new Date(data.updatedAt).getTime();
      }

      // 불필요한 필드 제거
      for (const [key, value] of Object.entries(data)) {
        if (this.shouldIncludeField(key)) {
          optimized[key] = this.optimizeForMobile(value);
        }
      }

      return optimized;
    }

    return data;
  }

  private optimizeImageUrl(url: string): string {
    // 모바일에 최적화된 이미지 URL로 변환
    // 예: CDN URL 추가, 크기 파라미터 추가 등
    if (!url) return url;
    
    try {
      const imageUrl = new URL(url);
      // 이미지 크기 최적화 파라미터 추가
      imageUrl.searchParams.set('width', '300');
      imageUrl.searchParams.set('quality', '80');
      return imageUrl.toString();
    } catch (error) {
      return url;
    }
  }

  private shouldIncludeField(fieldName: string): boolean {
    // 모바일에서 불필요한 필드 필터링
    const excludedFields = [
      'metadata',
      'rawData',
      'debug',
      'internal',
      '_id',
      '__v'
    ];
    
    return !excludedFields.includes(fieldName);
  }
} 