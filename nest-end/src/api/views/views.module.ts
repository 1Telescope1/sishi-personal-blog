import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Views } from './entities/view.entity';
import {RedisService} from "../redis/redis.service";
import {Share} from "../../utils/share";

@Module({
  imports:[TypeOrmModule.forFeature([Views]),Share],
  controllers: [ViewsController],
  providers: [ViewsService,RedisService]
})
export class ViewsModule {}
