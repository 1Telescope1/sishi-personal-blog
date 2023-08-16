import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {UserInfoService} from "../../api/user-info/user-info.service";
import {RedisService} from "../../api/redis/redis.service";
import {resourcePermission} from "../../common/exception";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly redisService:RedisService,private readonly userInfoService:UserInfoService) {
  }
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    // 获取请求对象
    const req=context.switchToHttp().getRequest()
    const data=JSON.parse(await this.redisService.getValue(req.user.userId))
    console.log(data)
    throw new resourcePermission("权限不够")
    // 获取请求中的用户信息进行逻辑判断->角色判断
    const userInfo=await this.userInfoService.isExistUser(req.user.nickname)

    // if(user.role.filter)

    return true;
  }
}
