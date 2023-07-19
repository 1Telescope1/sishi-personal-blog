import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Data<T> {
  data:T
}

@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Data<T>> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((result) => {
        return {
          data:result.data,
          status:result.status,
          message:result.message,
          success:result.success
        };
      }),
    );
  }
}
