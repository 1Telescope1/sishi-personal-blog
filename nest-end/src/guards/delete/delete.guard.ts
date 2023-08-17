import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {RedisService} from "../../api/redis/redis.service";
import {resourcePermission} from "../../common/exception";

@Injectable()
export class DeleteGuard implements CanActivate {
  constructor(private readonly redisService:RedisService) {
  }
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
    // 获取请求对象
    const req=context.switchToHttp().getRequest()
    const userId=req.user.userId
    
    const path=req.route.path
    const method=req.method

    // const data=JSON.parse(await this.redisService.getValue(`user:${req.user.userId}`))
    // const resource=data.resource
    // for(let i=0;i<resource.length;i++) {
    //   if(resource[i].url==path&&resource[i].requestMethod==method) {
    //     return true
    //   }
    // }

    throw new resourcePermission("权限不足")

  }
}
