import { Injectable } from '@nestjs/common';
import {Views} from "./entities/view.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {RedisService} from "../redis/redis.service";
import secondsUntilEndOfDay from "../../utils/secondsUntilEndOfDay";

@Injectable()
export class ViewsService {
  constructor(@InjectRepository(Views) private readonly viewsRepository:Repository<Views>,
              private readonly redisService:RedisService) {
  }

  async create(view: Views,req:any) {
    const realIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip=realIp.replace('::ffff:','');
    view.ip=ip
    const keys=await this.redisService.getAllKeys("ip:*")
    const vals=keys.map(item=>item.replace("ip:",""))
    const flag=vals.includes(ip)
    if(flag) return
    const time=secondsUntilEndOfDay()
    this.redisService.setValue(`ip:${ip}`,ip,time)
    const data=this.viewsRepository.save(view)
    return data;
  }

  findAll() {
    const data=this.viewsRepository.find()
    return data;
  }

  async getCnt() {
    const data=await this.viewsRepository.query(`select id from t_views order by id desc limit 1`)
    return data[0].id
  }

  removeIds(ids:number[]) {
    const data=this.viewsRepository.delete(ids)
    return data
  }

  remove(id: number) {
    const data=this.viewsRepository.delete(id)
    return data;
  }
}
