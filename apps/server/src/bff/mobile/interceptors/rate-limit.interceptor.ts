import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class MobileRateLimitInterceptor implements NestInterceptor {
  private readonly requestMap = new Map<string, number[]>();
  private readonly windowMs = 15 * 60 * 1000; // 15분
  private readonly maxRequests = 100; // 15분당 최대 100개 요청

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const key = this.generateKey(request);
    
    this.clearOldRequests(key);
    
    if (this.isRateLimitExceeded(key)) {
      throw new HttpException({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests',
          retryAfter: this.getRetryAfter()
        }
      }, HttpStatus.TOO_MANY_REQUESTS);
    }
    
    this.addRequest(key);
    return next.handle();
  }

  private generateKey(request: Request): string {
    // IP 주소와 사용자 ID를 조합하여 ��� 생성
    const ip = request.ip;
    const userId = (request as any).user?.id || 'anonymous';
    return `${ip}:${userId}`;
  }

  private clearOldRequests(key: string): void {
    const now = Date.now();
    const requests = this.requestMap.get(key) || [];
    const validRequests = requests.filter(timestamp => 
      now - timestamp < this.windowMs
    );
    
    if (validRequests.length === 0) {
      this.requestMap.delete(key);
    } else {
      this.requestMap.set(key, validRequests);
    }
  }

  private isRateLimitExceeded(key: string): boolean {
    const requests = this.requestMap.get(key) || [];
    return requests.length >= this.maxRequests;
  }

  private addRequest(key: string): void {
    const requests = this.requestMap.get(key) || [];
    requests.push(Date.now());
    this.requestMap.set(key, requests);
  }

  private getRetryAfter(): number {
    return Math.ceil(this.windowMs / 1000); // 초 단위로 반환
  }
} 