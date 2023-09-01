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
    const message = exception.getResponse().valueOf();
    const path = request.url;

    const exceptionLog = new ExceptionLog();
    exceptionLog.optUri = path;
    exceptionLog.optMethod = request.method;
    exceptionLog.exceptionInfo = message as string;
    exceptionLog.ipAddress = request.ip;
    exceptionLog.requestParam = objectToString(request.params);

    await this.exceptionLogService.create(exceptionLog); // 使用 await 等待保存操作完成

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
