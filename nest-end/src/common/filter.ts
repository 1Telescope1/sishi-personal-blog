import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

import {Request,Response} from 'express'


@Catch(HttpException)
export class HttpFilter implements ExceptionFilter{
  catch(exception: HttpException, host: ArgumentsHost) {
      const ctx=host.switchToHttp()
      const request =ctx.getRequest<Request>()
      const response=ctx.getResponse<Response>()
      const status=exception.getStatus()
      const message=exception.getResponse()
      response.status(status).json({
        success:false,
        time:new Date(),
        data:exception.getResponse(),
        message,
        status,
        path:request.url
      })

  }
}