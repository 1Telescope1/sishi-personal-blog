import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInfoService } from '../user-info/user-info.service';
import { UserInfo } from '../user-info/entities/user-info.entity';
import { CreateUserInfoDto } from '../user-info/dto/create-user-info.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {loginError} from "../../common/exception";
import {ResourceService} from "../resource/resource.service";
import {MenuService} from "../menu/menu.service";
import {RoleMenuService} from "../role-menu/role-menu.service";
import {RoleResourceService} from "../role-resource/role-resource.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly jwt: JwtService,
    private readonly resourceService:ResourceService,
    private readonly menuService:MenuService,
    private readonly roleMenuService:RoleMenuService,
    private readonly roleResourceService:RoleResourceService
  ) {}

  async signin(nickname: string, password: string) {
    const userInfo = await this.userInfoService.isExistUser(nickname);

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

    throw new loginError("账号或密码错误");
  }

  async getPermission(roleId:string) {

  }

  async signup(registerUser: CreateUserInfoDto) {
    const userFlag = await this.userInfoService.isExistUser(
      registerUser.nickname,
    );
    if (userFlag) {
      throw new loginError("用户已存在");
    }

    const user = new UserInfo();
    user.nickname = registerUser.nickname;
    user.password = bcrypt.hashSync(registerUser.password, 10);
    return this.userInfoService.create(user);
  }
}
