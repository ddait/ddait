import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { gzip } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);

@Injectable()
export class MobileNetworkOptimizationInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse();
    
    // 네트워크 상태 확인
    const networkInfo = this.getNetworkInfo(request);
    
    return next.handle().pipe(
      map(async data => {
        // 네트워크 상태에 따른 최적화 적용
        const optimizedData = await this.optimizeForNetwork(data, networkInfo);
        
        // 응답 헤더 설정
        this.setOptimizationHeaders(response, networkInfo);
        
        return optimizedData;
      })
    );
  }

  private getNetworkInfo(request: Request): NetworkInfo {
    return {
      type: request.headers['x-network-type'] as NetworkType || 'wifi',
      effectiveType: request.headers['x-network-effective-type'] as EffectiveType || '4g',
      downlink: Number(request.headers['x-network-downlink']) || 10,
      rtt: Number(request.headers['x-network-rtt']) || 50
    };
  }

  private async optimizeForNetwork(data: any, networkInfo: NetworkInfo): Promise<any> {
    if (!data) return data;

    // 네트워크 상태에 따른 최적화 전략 적용
    const strategy = this.getOptimizationStrategy(networkInfo);
    
    return this.applyOptimizationStrategy(data, strategy);
  }

  private getOptimizationStrategy(networkInfo: NetworkInfo): NetworkOptimizationStrategy {
    // 네트워크 상태에 따른 최적화 전략 결정
    if (networkInfo.type === 'cellular' && networkInfo.effectiveType === 'slow-2g') {
      return {
        compressResponse: true,
        minifyJson: true,
        omitNullValues: true,
        batchRequests: true,
        imageQuality: 50,
        maxImageWidth: 150,
        enablePagination: true,
        pageSize: 10
      };
    } else if (networkInfo.effectiveType === '2g' || networkInfo.effectiveType === '3g') {
      return {
        compressResponse: true,
        minifyJson: true,
        omitNullValues: false,
        batchRequests: true,
        imageQuality: 70,
        maxImageWidth: 200,
        enablePagination: true,
        pageSize: 20
      };
    } else {
      return {
        compressResponse: false,
        minifyJson: false,
        omitNullValues: false,
        batchRequests: false,
        imageQuality: 80,
        maxImageWidth: 300,
        enablePagination: false,
        pageSize: 50
      };
    }
  }

  private async applyOptimizationStrategy(
    data: any,
    strategy: NetworkOptimizationStrategy
  ): Promise<any> {
    if (Array.isArray(data)) {
      // 페이지네이션 적용
      if (strategy.enablePagination) {
        data = this.applyPagination(data, strategy.pageSize);
      }
      return Promise.all(
        data.map(item => this.applyOptimizationStrategy(item, strategy))
      );
    }

    if (typeof data === 'object' && data !== null) {
      const optimized = { ...data };

      // null 값 제거
      if (strategy.omitNullValues) {
        Object.keys(optimized).forEach(key => {
          if (optimized[key] === null) {
            delete optimized[key];
          }
        });
      }

      // 이미지 URL 최적화
      if (optimized.imageUrl) {
        optimized.imageUrl = this.optimizeImageUrl(
          optimized.imageUrl,
          strategy.imageQuality,
          strategy.maxImageWidth
        );
      }

      // 응답 압축
      if (strategy.compressResponse) {
        return this.compressData(optimized);
      }

      return optimized;
    }

    return data;
  }

  private applyPagination(data: any[], pageSize: number): any[] {
    return data.slice(0, pageSize);
  }

  private optimizeImageUrl(url: string, quality: number, maxWidth: number): string {
    if (!url) return url;
    
    try {
      const imageUrl = new URL(url);
      imageUrl.searchParams.set('q', quality.toString());
      imageUrl.searchParams.set('w', maxWidth.toString());
      return imageUrl.toString();
    } catch (error) {
      return url;
    }
  }

  private async compressData(data: any): Promise<any> {
    try {
      const jsonString = JSON.stringify(data);
      const compressed = await gzipAsync(Buffer.from(jsonString));
      return compressed.toString('base64');
    } catch (error) {
      return data;
    }
  }

  private setOptimizationHeaders(response: any, networkInfo: NetworkInfo): void {
    response.header('X-Network-Type', networkInfo.type);
    response.header('X-Network-Effective-Type', networkInfo.effectiveType);
    response.header('X-Network-Optimization-Applied', 'true');
  }
}

type NetworkType = 'wifi' | 'cellular' | 'unknown';
type EffectiveType = 'slow-2g' | '2g' | '3g' | '4g';

interface NetworkInfo {
  type: NetworkType;
  effectiveType: EffectiveType;
  downlink: number;
  rtt: number;
}

interface NetworkOptimizationStrategy {
  compressResponse: boolean;
  minifyJson: boolean;
  omitNullValues: boolean;
  batchRequests: boolean;
  imageQuality: number;
  maxImageWidth: number;
  enablePagination: boolean;
  pageSize: number;
} 