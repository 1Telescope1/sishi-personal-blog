import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UserInfoModule} from "../user-info/user-info.module";
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import {jwtConstants} from './constants'
import {JwtStrategy} from "./auth.strategy";

@Module({
  imports:[UserInfoModule,PassportModule,JwtModule.register({
    secret:jwtConstants.secret,
    signOptions: { expiresIn: '100d' },
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
