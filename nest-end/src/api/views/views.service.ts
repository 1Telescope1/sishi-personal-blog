import { Injectable } from '@nestjs/common';
import { Views } from './entities/view.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import secondsUntilEndOfDay from '../../utils/secondsUntilEndOfDay';
import transformData from "../../utils/transformData";

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(Views)
    private readonly viewsRepository: Repository<Views>,
    private readonly redisService: RedisService,
  ) {}

  async create(view: Views, req: any) {
    const realIp =
      req.headers['x-real-ip'] ||
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress;
    const ip = realIp.replace('::ffff:', '');
    if(ip=="127.0.0.1") return
    view.ip = ip;
    const keys = await this.redisService.getAllKeys('ip:*');
    const vals = keys.map((item) => item.replace('ip:', ''));
    const flag = vals.includes(ip);
    if (flag) return;
    const time = secondsUntilEndOfDay();
    this.redisService.setValue(`ip:${ip}`, ip, time);
    const data = this.viewsRepository.save(view);
    return data;
  }

  findAll() {
    const data = this.viewsRepository.find();
    return data;
  }

  async findPage(pageNum: number, pageSize: number, address: string) {
    // const totalResult = await this.viewsRepository.query(
    //   'select count(*) as total from t_views where address like ?',
    //   [`%${address}%`],
    // );
    //
    // const data = await this.viewsRepository.query(
    //   'select * from t_views where address like ? order by id desc limit ?,?',
    //   [`%${address}%`,(pageNum - 1) * pageSize, pageSize],
    // );

    const totalResult = await this.viewsRepository.query(
      'select count(*) as total from t_views '
    );

    const data = await this.viewsRepository.query(
      'select * from t_views  order by id desc limit ?,?',
      [(pageNum - 1) * pageSize, pageSize],
    );

    const transformedResult=transformData(data)


    return { records: transformedResult,total:Number(totalResult[0].total), pageSize, pageNum };
  }


  async getCnt() {
    const data = await this.viewsRepository.query(
      `select id from t_views order by id desc limit 1`,
    );
    return data[0].id;
  }

  removeIds(ids: number[]) {
    const data = this.viewsRepository.delete(ids);
    return data;
  }

  remove(id: number) {
    const data = this.viewsRepository.delete(id);
    return data;
  }
}
