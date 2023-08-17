import { Injectable } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {About} from './entities/about.entity'

@Injectable()
export class AboutService {
  constructor(@InjectRepository(About) private readonly aboutRepository:Repository<About>){}

  findAll() {
    const data=this.aboutRepository.find()
    
    return data;
  }

}
