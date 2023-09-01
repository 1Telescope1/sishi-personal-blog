import { Injectable } from '@nestjs/common';
import {ExceptionLog} from "./entities/exception-log.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExceptionLogService {
  constructor(@InjectRepository(ExceptionLog) private readonly exceptionLogRepository:Repository<ExceptionLog>) {
  }

  async create(exceptionLog: ExceptionLog) {
    const data=await this.exceptionLogRepository.save(exceptionLog);
    return data;
  }

  findAll() {
    const data=this.exceptionLogRepository.find()
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} exceptionLog`;
  }


  remove(id: number) {
    const data=this.exceptionLogRepository.delete(id)
    return data;
  }

  removeLogs(ids:number[]) {
    const data=this.exceptionLogRepository.delete(ids)
    return data;
  }
}
