import { Injectable } from '@nestjs/common';
import { ExceptionLog } from './entities/exception-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import transformData from "../../utils/transformData";

@Injectable()
export class ExceptionLogService {
  constructor(
    @InjectRepository(ExceptionLog)
    private readonly exceptionLogRepository: Repository<ExceptionLog>,
  ) {}

  async create(exceptionLog: ExceptionLog) {
    const data = await this.exceptionLogRepository.save(exceptionLog);
    return data;
  }

  findAll() {
    const data = this.exceptionLogRepository.find();
    return data;
  }

  async findPage(
    pageNum: number,
    pageSize: number,
    url: string,
    method: string,
  ) {
    const totalResult = await this.exceptionLogRepository.query(
      'select count(*) as total from t_exception_log  where opt_uri like ? and opt_method like ? ',
      [`%${url}%`, `%${method}%`]
    );

    const data = await this.exceptionLogRepository.query(
      'select * from t_exception_log  where opt_uri like ? and opt_method like ? order by id desc limit ?,?',
      [`%${url}%`, `%${method}%`,(pageNum - 1) * pageSize, pageSize]
    );


    const transformedResult=transformData(data)

    return {records:transformedResult,total:Number(totalResult[0].total), pageSize, pageNum}
  }

  findOne(id: number) {
    return `This action returns a #${id} exceptionLog`;
  }

  remove(id: number) {
    const data = this.exceptionLogRepository.delete(id);
    return data;
  }

  removeLogs(ids: number[]) {
    const data = this.exceptionLogRepository.delete(ids);
    return data;
  }
}
