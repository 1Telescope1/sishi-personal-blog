import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import {RoleMenu} from "../role-menu/entities/role-menu.entity";
import {RoleResource} from "../role-resource/entities/role-resource.entity";
import {RoleMenuService} from "../role-menu/role-menu.service";
import {RoleResourceService} from "../role-resource/role-resource.service";
import {RedisService} from "../redis/redis.service";

@Module({
  imports:[TypeOrmModule.forFeature([Role,RoleMenu,RoleResource])],
  controllers: [RoleController],
  providers: [RoleService,RoleMenuService,RoleResourceService,RedisService]
})
export class RoleModule {}
