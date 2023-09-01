import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from './entities/logger.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Logger])],
  controllers: [LoggerController],
  providers: [LoggerService],
  exports:[LoggerService]
})
export class LoggerModule {}
