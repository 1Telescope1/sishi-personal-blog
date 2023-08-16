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

@Module({
  imports: [
    UserInfoModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '100d' },
    }),
    TypeOrmModule.forFeature([Menu, Resource,RoleResource,RoleMenu]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ResourceService, MenuService,RoleResourceService,RoleMenuService,RedisService],
})
export class AuthModule {}
