import { Module } from '@nestjs/common';
import { RedisService } from "../api/redis/redis.service";

@Module({
  providers: [RedisService], // 在提供者中提供 RedisService
  exports: [RedisService], // 导出 RedisService，使其在其他模块中可用
})
export class Share {}
