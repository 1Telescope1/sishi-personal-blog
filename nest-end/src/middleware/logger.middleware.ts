import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../api/logger/logger.service';
import {OperationLogService} from "../api/operation-log/operation-log.service";
import {OperationLog} from "../api/operation-log/entities/operation-log.entity";
import objectToString from "../utils/objectToString";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService,private  readonly operationLogService:OperationLogService) {}

  use(req: Request | any, res: Response, next: NextFunction) {
    let { method, originalUrl, ip ,params } = req;
    this.loggerService.log(`[${method}] ${originalUrl} from ${ip.replace('::ffff:','')}`);
    let userId=-1
    let nickname=''
    if(req.user) {
      userId=req.user.userId
      nickname=req.user.nickname
    }

    const operationLog=new OperationLog()
    operationLog.ipAddress=ip.replace('::ffff:','');
    operationLog.nickname=nickname
    operationLog.userId=userId
    operationLog.optUri=originalUrl
    operationLog.requestMethod=method
    operationLog.requestParam=objectToString(params)
    this.operationLogService.create(operationLog)

    next();
  }
}
