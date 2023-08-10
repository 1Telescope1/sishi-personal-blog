import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Result } from '../../common/result';
import { CreateUserInfoDto } from '../user-info/dto/create-user-info.dto';
import { UserInfo } from '../user-info/entities/user-info.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录
  @Post('signin')
  async signin(@Body() userInfo: UserInfo) {
    const { nickname, password } = userInfo;

    const data=await this.authService.signin(nickname,password)
    return new Result(data);
  }

  //注册
  @Post('signup')
  async signup(@Body() userInfoDto: CreateUserInfoDto) {
    if(userInfoDto.password!=userInfoDto.confirmPwd) {
      return new Result(null,406)
    }
    return new Result(await this.authService.signup(userInfoDto));
  }
}
