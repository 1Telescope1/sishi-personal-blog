import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInfoService } from '../user-info/user-info.service';
import { UserInfo } from '../user-info/entities/user-info.entity';
import { CreateUserInfoDto } from '../user-info/dto/create-user-info.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly jwt: JwtService,
  ) {}

  async signin(nickname: string, password: string) {
    const userInfo = await this.userInfoService.isExistUser(nickname);
    if (!userInfo) {
      throw new UnauthorizedException();
    }

    const flag = await bcrypt.compare(password, userInfo.password);
    if (userInfo && flag) {
      // 生成token
      const token = await this.jwt.signAsync(
        {
          nickname: userInfo.nickname,
          sub: userInfo.id,
        },
      );
      delete userInfo.password
      return { userInfo, token };
    }

    throw new UnauthorizedException();
  }

  async signup(registerUser: CreateUserInfoDto) {
    const userFlag = await this.userInfoService.isExistUser(
      registerUser.nickname,
    );
    if (userFlag) {
      return null;
    }

    const user = new UserInfo();
    user.nickname = registerUser.nickname;
    user.password = bcrypt.hashSync(registerUser.password, 10);
    return this.userInfoService.create(user);
  }
}
