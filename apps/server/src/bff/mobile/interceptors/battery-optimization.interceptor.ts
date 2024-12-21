import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MobileBatteryOptimizationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const batteryLevel = parseInt(request.headers['x-battery-level'] || '100');

    // 배터리 레벨이 낮은 경우 최적화 적용
    if (batteryLevel <= 20) {
      response.header('x-battery-optimization-applied', 'true');
    }

    return next.handle().pipe(
      tap(() => {
        // 추가적인 배터리 최적화 로직을 여기에 구현
      })
    );
  }
} 