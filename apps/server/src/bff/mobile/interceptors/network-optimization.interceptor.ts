import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MobileNetworkOptimizationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const networkType = request.get('x-network-type') || '4g';

    // 네트워크 최적화 적용 여부 결정
    const shouldOptimize = ['2g', '3g'].includes(networkType.toLowerCase());
    response.header('x-network-optimization-applied', shouldOptimize.toString());

    return next.handle().pipe(
      tap(() => {
        if (shouldOptimize) {
          // 네트워크 최적화 로직을 여기에 구현
          // 예: 데이터 압축, 이미지 최적화 등
        }
      })
    );
  }
} 