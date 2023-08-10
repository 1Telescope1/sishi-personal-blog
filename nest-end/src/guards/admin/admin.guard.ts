import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {UserInfoService} from "../../api/user-info/user-info.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userInfoService:UserInfoService) {
  }
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    // 获取请求对象
    const req=context.switchToHttp().getRequest()
    // 获取请求中的用户信息进行逻辑判断->角色判断
    const userInfo=await this.userInfoService.isExistUser(req.user.nickname)

    // if(user.role.filter)

    return true;
  }
}
