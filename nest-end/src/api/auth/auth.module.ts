import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserInfoModule } from '../user-info/user-info.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './auth.strategy';
import { ResourceModule } from "../resource/resource.module";
import { MenuModule } from "../menu/menu.module";
import { RoleResourceModule } from "../role-resource/role-resource.module";
import { RedisModule } from "../redis/redis.module";
import { RoleMenuModule } from "../role-menu/role-menu.module";
import { RefresTokenModule } from '../refresh-token/refresh-token.module';

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
    RefresTokenModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
