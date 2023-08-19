import { Controller, Get } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get('info')
  getInfoLog() {
    this.loggerService.log('This is an info log.');
    return 'Info log recorded.';
  }

  @Get('error')
  getErrorLog() {
    this.loggerService.error('This is an error log.', 'Error trace details...');
    return 'Error log recorded.';
  }
}
