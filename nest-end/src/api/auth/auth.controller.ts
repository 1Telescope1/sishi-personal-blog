import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Result } from '../../common/result';
import { CreateUserInfoDto } from '../user-info/dto/create-user-info.dto';
import { UserInfo } from '../user-info/entities/user-info.entity';
import * as svgCaptcha from 'svg-captcha';
import { registerError } from '../../common/exception';
import { RedisService } from '../redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
    private configService: ConfigService
  ) {}

  // 登录
  @Post('signin')
  async signin(@Body() userInfo: UserInfo) {
    const { nickname, password } = userInfo;

    const data = await this.authService.signin(nickname, password);
    return new Result(data);
  }

  //注册
  @Post('signup')
  async signup(@Body() userInfoDto: CreateUserInfoDto, @Req() req: any) {
    const arrVal = [];
    const keys = await this.redisService.getAllKeys('code:*');
    for (let i = 0; i < keys.length; i++) {
      const val = await this.redisService.getValue(keys[i]);
      arrVal.push(val);
    }
    let flag = false;
    for (let i = 0; i < arrVal.length; i++) {
      if (
        userInfoDto.identifyCode.toLocaleLowerCase() ==
        arrVal[i].toLocaleLowerCase()
      ) {
        flag = true;
        break;
      }
    }
    if (!flag) throw new registerError('验证码有误');

    if (userInfoDto.password != userInfoDto.confirmPwd) {
      return new Result(null, 406);
    }
    return new Result(await this.authService.signup(userInfoDto));
  }

  // 获取验证码
  //利用svg-captcha生成校验码图片并存储在前端session中
  @Get('code/:id')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    req.session.captcha = captcha.text; //存储验证码记录到session
    this.redisService.setValue(`code:${captcha.text}`, captcha.text, 60);

    res.set('Access-Control-Allow-Origin', '*'); // 允许所有域名进行跨域请求
    res.set('Cross-Origin-Opener-Policy', 'cross-origin');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    res.type('svg');
    res.send(captcha.data);
    return new Result(captcha.data);

  }
}
