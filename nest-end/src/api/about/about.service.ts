import { Injectable } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {About} from './entities/about.entity'

@Injectable()
export class AboutService {
  constructor(@InjectRepository(About) private readonly aboutRepository:Repository<About>){}

  create(createAboutDto: CreateAboutDto) {
    return 'This action adds a new about';
  }

  findAll() {
    const data=this.aboutRepository.find()
    
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} about`;
  }

  update(id: number, updateAboutDto: UpdateAboutDto) {
    return `This action updates a #${id} about`;
  }

  remove(id: number) {
    return `This action removes a #${id} about`;
  }
}
