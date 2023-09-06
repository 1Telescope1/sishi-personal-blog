import { Injectable } from '@nestjs/common';
import {Views} from "./entities/view.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {RedisService} from "../redis/redis.service";

@Injectable()
export class ViewsService {
  constructor(@InjectRepository(Views) private readonly viewsRepository:Repository<Views>,
              private readonly redisService:RedisService) {
  }

  create(view: Views) {
    const data=this.viewsRepository.create(view)
    return data;
  }

  findAll() {
    const data=this.viewsRepository.find()
    return data;
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
