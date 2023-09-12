import { Injectable } from '@nestjs/common';
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

  findAll() {
    const data=Promise.all([this.ArticleRepository.count(),this.TagRepository.count(),this.TalkRepository.count()])
    return data;
  }

}
