// redis.module.ts

import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';

@Module({
  providers: [RedisService], // 注册 RedisService 作为提供者
  exports: [RedisService], // 导出 RedisService
  controllers: [RedisController],
})
export class RedisModule {}

