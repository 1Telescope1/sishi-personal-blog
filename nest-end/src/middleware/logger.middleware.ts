import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../api/logger/logger.service'; // 假设你的LoggerService路径在这里

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    this.loggerService.log(`[${method}] ${originalUrl} from ${ip}`);
    next();
  }
}
