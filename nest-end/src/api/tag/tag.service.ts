import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import {ArticleService} from "../article/article.service";

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private readonly tagRepository:Repository<Tag>,private  readonly articleService:ArticleService){}

  create(tag:Tag) {
    const data=this.tagRepository.save(tag)
    return data;
  }

  async findAll() {
    const data=await this.tagRepository.find()
    for (let i=0;i<data.length;i++) {
      data[i].cnt=await this.articleService.getArticleCntByTag(data[i].id)
    }
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
