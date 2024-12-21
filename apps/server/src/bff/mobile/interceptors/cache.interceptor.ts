import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MobileCacheInterceptor implements NestInterceptor {
  private cache = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = request.url;
    const cachedResponse = this.cache.get(cacheKey);

    if (cachedResponse) {
      const response = context.switchToHttp().getResponse();
      response.header('x-cache-hit', 'true');
      return new Observable(subscriber => {
        subscriber.next(cachedResponse);
        subscriber.complete();
      });
    }

    return next.handle().pipe(
      tap(response => {
        this.cache.set(cacheKey, response);
      })
    );
  }
} 