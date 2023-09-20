import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleMenu } from '../role-menu/entities/role-menu.entity';
import { RoleResource } from '../role-resource/entities/role-resource.entity';
import { RoleMenuService } from '../role-menu/role-menu.service';
import { RoleResourceService } from '../role-resource/role-resource.service';
import { RedisService } from '../redis/redis.service';
import { AuthService } from '../auth/auth.service';
import { UserInfoService } from '../user-info/user-info.service';
import { JwtService } from '@nestjs/jwt';
import { ResourceService } from '../resource/resource.service';
import { MenuService } from '../menu/menu.service';
import {Resource} from "../resource/entities/resource.entity";
import {UserInfo} from "../user-info/entities/user-info.entity";
import {Menu} from "../menu/entities/menu.entity";
import {RoleMenuModule} from "../role-menu/role-menu.module";
import {RoleResourceModule} from "../role-resource/role-resource.module";
import {AuthModule} from "../auth/auth.module";
import {Share} from "../../utils/share";

@Module({
  imports: [TypeOrmModule.forFeature([Role]),RoleMenuModule,RoleResourceModule,AuthModule,Share],
  controllers: [RoleController],
  providers: [
    RoleService,
  ],
  exports:[RoleService]
})
export class RoleModule {}
