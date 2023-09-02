import { Module } from '@nestjs/common';
import { ExceptionLogService } from './exception-log.service';
import { ExceptionLogController } from './exception-log.controller';
import {ExceptionLog} from "./entities/exception-log.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import {Share} from "../../utils/share";

@Module({
  imports: [TypeOrmModule.forFeature([ExceptionLog]),Share], // 导入 ExceptionLogRepository
  controllers: [ExceptionLogController],
  providers: [ExceptionLogService],
  exports:[ExceptionLogService]
})
export class ExceptionLogModule {}
