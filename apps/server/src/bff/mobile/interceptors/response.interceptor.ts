import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MobileResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof Error) {
          const status = data instanceof HttpException ? data.getStatus() : 500;
          return {
            error: {
              message: data.message || '내부 서버 오류',
              statusCode: status
            }
          };
        }

        return {
          data,
          meta: {
            timestamp: new Date().toISOString(),
            version: '1.0'
          }
        };
      })
    );
  }
} 