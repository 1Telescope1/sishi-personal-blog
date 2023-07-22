import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepository:Repository<Tag>){}

  create(tag:Tag) {
    const data=this.tagRepository.save(tag)
    return data;
  }

  findAll() {
    const data=this.tagRepository.find()
    return data;
  }

  findOne(id: number) {
    const data=this.tagRepository.find({where:{id}})
    return data;
  }


  remove(id: number) {
    const data=this.tagRepository.delete(id)
    return data;
  }
}
