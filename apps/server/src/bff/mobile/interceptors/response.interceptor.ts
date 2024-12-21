import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class MobileResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        data,
        meta: {
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      })),
      catchError(error => {
        const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error instanceof HttpException ? error.message : 'Internal server error';
        
        // 에러 응답을 변환하여 반환
        const response = context.switchToHttp().getResponse<Response>();
        response.status(status);
        
        // Observable로 에러 응답 형식을 반환
        return new Observable(subscriber => {
          subscriber.next({
            error: {
              message,
              statusCode: status
            },
            meta: {
              timestamp: new Date().toISOString(),
              version: '1.0'
            }
          });
          subscriber.complete();
        });
      })
    );
  }
} 