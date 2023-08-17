import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user-info.entity';
import {RedisService} from "../redis/redis.service";
import {RoleMenuService} from "../role-menu/role-menu.service";
import {MenuService} from "../menu/menu.service";
import {Menu} from "../menu/entities/menu.entity";
import {RoleMenu} from "../role-menu/entities/role-menu.entity";

@Module({
  imports:[TypeOrmModule.forFeature([UserInfo,RoleMenu,Menu])],
  controllers: [UserInfoController],
  providers: [UserInfoService,RedisService,RoleMenuService,MenuService],
  exports:[UserInfoService]
})
export class UserInfoModule {}
