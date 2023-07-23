import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../article/entities/article.entity';
import { Repository } from 'typeorm';
import { Tag } from '../tag/entities/tag.entity';
import { Talk } from '../talk/entities/talk.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Article)
    private readonly ArticleRepository: Repository<Article>,
    @InjectRepository(Tag) private readonly TagRepository: Repository<Tag>,
    @InjectRepository(Talk) private readonly TalkRepository: Repository<Talk>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    return 'This action adds a new blog';
  }

  findAll() {
    const data=Promise.all([this.ArticleRepository.count(),this.TagRepository.count(),this.TalkRepository.count()])
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
