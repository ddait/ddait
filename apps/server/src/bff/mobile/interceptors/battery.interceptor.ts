import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class MobileBatteryOptimizationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const batteryLevel = this.getBatteryLevel(request);
    
    return next.handle().pipe(
      map(data => {
        // 배터리 레벨에 따른 최적화 적용
        return this.optimizeForBattery(data, batteryLevel);
      })
    );
  }

  private getBatteryLevel(request: Request): number {
    // 클라이언트에서 전송한 배터리 레벨 정보 추출
    const batteryLevel = Number(request.headers['x-battery-level']) || 100;
    return Math.min(Math.max(batteryLevel, 0), 100);
  }

  private optimizeForBattery(data: any, batteryLevel: number): any {
    if (!data) return data;

    // 배터리 레벨에 따른 최적화 전략 적용
    const optimizationStrategy = this.getOptimizationStrategy(batteryLevel);
    
    return this.applyOptimizationStrategy(data, optimizationStrategy);
  }

  private getOptimizationStrategy(batteryLevel: number): OptimizationStrategy {
    if (batteryLevel <= 15) {
      return {
        disableAnimations: true,
        reducePollingFrequency: true,
        disableBackgroundSync: true,
        compressImages: true,
        imageQuality: 60,
        maxImageWidth: 200,
      };
    } else if (batteryLevel <= 30) {
      return {
        disableAnimations: false,
        reducePollingFrequency: true,
        disableBackgroundSync: false,
        compressImages: true,
        imageQuality: 70,
        maxImageWidth: 250,
      };
    } else {
      return {
        disableAnimations: false,
        reducePollingFrequency: false,
        disableBackgroundSync: false,
        compressImages: false,
        imageQuality: 80,
        maxImageWidth: 300,
      };
    }
  }

  private applyOptimizationStrategy(data: any, strategy: OptimizationStrategy): any {
    if (Array.isArray(data)) {
      return data.map(item => this.applyOptimizationStrategy(item, strategy));
    }

    if (typeof data === 'object' && data !== null) {
      const optimized = { ...data };

      // 이미지 URL 최적화
      if (optimized.imageUrl && strategy.compressImages) {
        optimized.imageUrl = this.optimizeImageUrl(
          optimized.imageUrl,
          strategy.imageQuality,
          strategy.maxImageWidth
        );
      }

      // 애니메이션 관련 설정 최적화
      if (strategy.disableAnimations) {
        optimized.animations = false;
      }

      // 폴링 주기 최적화
      if (strategy.reducePollingFrequency) {
        optimized.pollingInterval = Math.max(
          (optimized.pollingInterval || 1000) * 2,
          5000
        );
      }

      // 백그라운드 동기화 설정
      if (strategy.disableBackgroundSync) {
        optimized.backgroundSync = false;
      }

      return optimized;
    }

    return data;
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
}

interface OptimizationStrategy {
  disableAnimations: boolean;
  reducePollingFrequency: boolean;
  disableBackgroundSync: boolean;
  compressImages: boolean;
  imageQuality: number;
  maxImageWidth: number;
} 