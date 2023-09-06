import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Views } from './entities/view.entity';
import {RedisService} from "../redis/redis.service";

@Module({
  imports:[TypeOrmModule.forFeature([Views])],
  controllers: [ViewsController],
  providers: [ViewsService,RedisService]
})
export class ViewsModule {}
