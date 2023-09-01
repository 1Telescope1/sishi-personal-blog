import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createLogger, format, transports } from 'winston';
import { Logger } from './entities/logger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggerService {

  private readonly logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.json()
    ),
    transports: [
      new transports.Console(),// 控制台输出
      new transports.File({ filename: 'logs/error.log', level: 'error' }),// 错误日志文件
      new transports.File({ filename: 'logs/combined.log' }),// 综合日志文件
    ],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }
}
