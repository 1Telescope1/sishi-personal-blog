import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Share } from 'src/utils/share';
import {Article} from "../article/entities/article.entity";
import {ArticleService} from "../article/article.service";

@Module({
  imports:[TypeOrmModule.forFeature([Tag,Article]),Share],
  controllers: [TagController],
  providers: [TagService,ArticleService]
})
export class TagModule {}
