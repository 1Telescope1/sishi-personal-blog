import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionLogService } from '../api/exception-log/exception-log.service';
import { ExceptionLog } from '../api/exception-log/entities/exception-log.entity';
import objectToString from '../utils/objectToString';

@Catch(HttpException)
@Injectable()
export class HttpFilter implements ExceptionFilter {

  constructor(private readonly exceptionLogService: ExceptionLogService) {} // 使用 @Inject() 装饰器注入

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message:string | Object = exception.getResponse().valueOf();
    const path = request.url;

    const exceptionLog = new ExceptionLog();
    exceptionLog.optUri = path;
    exceptionLog.optMethod = request.method;
    exceptionLog.exceptionInfo = typeof(message) == 'object' ? JSON.stringify(message) : message
    exceptionLog.ipAddress = request.ip.replace('::ffff:','');
    exceptionLog.requestParam = objectToString(request.params);

    if (!path.includes("/socket.io/?EIO=")) await this.exceptionLogService.create(exceptionLog);

    response.status(status).json({
      success: false,
      time: new Date(),
      data: message,
      message,
      status,
      path,
    });
  }
}
