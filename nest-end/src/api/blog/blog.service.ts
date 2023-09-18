import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../article/entities/article.entity';
import { Repository } from 'typeorm';
import { Tag } from '../tag/entities/tag.entity';
import { Talk } from '../talk/entities/talk.entity';
import { Views } from '../views/entities/view.entity';
import { UserInfo } from '../user-info/entities/user-info.entity';
import { Message } from '../message/entities/message.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Article)
    private readonly ArticleRepository: Repository<Article>,
    @InjectRepository(Tag) private readonly TagRepository: Repository<Tag>,
    @InjectRepository(Talk) private readonly TalkRepository: Repository<Talk>,
    @InjectRepository(Views)
    private readonly viewsRepository: Repository<Views>,
    @InjectRepository(UserInfo)
    private readonly userinfoRepository: Repository<UserInfo>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  findAll() {
    const data = Promise.all([
      this.ArticleRepository.count(),
      this.TagRepository.count(),
      this.TalkRepository.count(),
    ]);
    return data;
  }

  async blogDetail() {
    const views = await this.viewsRepository.query(
      `select id from t_views order by id desc limit 1`,
    );
    const data =await Promise.all([
      this.userinfoRepository.count(),
      this.ArticleRepository.count(),
      this.messageRepository.count(),
    ]);
    data.unshift(views[0].id)
    return data;
  }
}
