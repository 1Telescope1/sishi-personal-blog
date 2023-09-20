import { Injectable } from '@nestjs/common';
import { Back } from './entities/back.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BackService {
  constructor(@InjectRepository(Back) private readonly backRepository:Repository<Back>){}

  create(back: Back) {
    const data=this.backRepository.save(back)
    return data;
  }

  findAll() {
    const data=this.backRepository.find()
    return data;
  }

  async remove(id: number) {
    const data=this.backRepository.delete(id)
    return data;
  }
}
