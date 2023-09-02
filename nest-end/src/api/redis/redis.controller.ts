import { Controller, Get, Param ,Delete} from '@nestjs/common';
import { RedisService } from './redis.service';
import {Result} from "../../common/result";

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('set/:key/:value')
  async setKey(@Param('key') key: string, @Param('value') value: string){
    return new Result(await this.redisService.setValue(key, value));
  }

  @Get('get/:key')
  async getValue(@Param('key') key: string) {
    return new Result(await this.redisService.getValue(key));
  }

  @Delete('del/:key')
  async delValue(@Param('key') key: string) {
    return new Result(await this.redisService.delValue(key));
  }

  @Get('set/:key/:field/:value')
  async setHashField(@Param('key') key: string, @Param('field') field: string,@Param('value') value: string){
    return new Result(await this.redisService.setHashField(key,field,value));
  }

  @Get('get/:key/:field')
  async getHashField(@Param('key') key: string, @Param('field') field: string){
    return new Result(await this.redisService.getHashField(key,field));
  }

  @Get('getAll/:key')
  async getAllHashFields(@Param('key') key: string){
    return new Result(await this.redisService.getAllHashFields(key));
  }

}
