import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable,map } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req=context.switchToHttp().getRequest()
    console.log('拦截器之前',req)
    return next.handle().pipe(
      map((data)=>{
        return data
      })
    )
  }
}
