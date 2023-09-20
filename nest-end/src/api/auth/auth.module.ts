import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserInfoModule } from '../user-info/user-info.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './auth.strategy';
import { ResourceService } from '../resource/resource.service';
import { MenuService } from '../menu/menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '../menu/entities/menu.entity';
import { Resource } from '../resource/entities/resource.entity';
import {RoleResource} from "../role-resource/entities/role-resource.entity";
import {RoleMenu} from "../role-menu/entities/role-menu.entity";
import {RoleResourceService} from "../role-resource/role-resource.service";
import {RoleMenuService} from "../role-menu/role-menu.service";
import {RedisService} from "../redis/redis.service";
import {ResourceModule} from "../resource/resource.module";
import {MenuModule} from "../menu/menu.module";
import {RoleResourceModule} from "../role-resource/role-resource.module";
import {RedisModule} from "../redis/redis.module";
import {RoleMenuModule} from "../role-menu/role-menu.module";

@Module({
  imports: [
    UserInfoModule,
    PassportModule,
    ResourceModule,
    MenuModule,
    RoleResourceModule,
    RedisModule,
    RoleMenuModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
