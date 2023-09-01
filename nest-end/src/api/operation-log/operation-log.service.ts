import { Injectable } from '@nestjs/common';
import { CreateOperationLogDto } from './dto/create-operation-log.dto';
import { UpdateOperationLogDto } from './dto/update-operation-log.dto';
import {OperationLog} from "./entities/operation-log.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Result} from "../../common/result";

@Injectable()
export class OperationLogService {
  constructor(@InjectRepository(OperationLog) private readonly OperationRepository:Repository<OperationLog>) {
  }

  create(operationLog:OperationLog) {
    const data=this.OperationRepository.save(operationLog)
    return data
  }

  findAll() {
    const data=this.OperationRepository.find()
    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} operationLog`;
  }


  remove(id: number) {
    const data=this.OperationRepository.delete(id)
    return data
  }

  removeLogs(ids:number[]) {
    const data=this.OperationRepository.delete(ids)
    return data
  }

}
