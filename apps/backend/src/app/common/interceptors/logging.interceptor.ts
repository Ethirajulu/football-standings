import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const requestId = uuidv4();
    const now = Date.now();

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request & { body?: unknown }>();

    const method = request.method;
    const url = request.url;
    const body = request.body;

    Logger.log(`[${requestId}] ${new Date().toISOString()} - ${method} ${url}`);

    Logger.log(
      `[${requestId}] Payload: ${body ? JSON.stringify(body) : 'N/A'}`
    );

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - now;
        Logger.log(
          `[${requestId}] Response sent in ${duration}ms`,
          data && typeof data === 'object' && data !== null && 'status' in data
            ? `Status: ${data['status']}`
            : 'Status: 200'
        );
      })
    );
  }
}
