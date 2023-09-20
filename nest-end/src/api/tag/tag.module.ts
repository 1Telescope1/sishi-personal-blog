import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Share } from 'src/utils/share';
import {Article} from "../article/entities/article.entity";
import {ArticleService} from "../article/article.service";
import {ArticleModule} from "../article/article.module";

@Module({
  imports:[TypeOrmModule.forFeature([Tag]),ArticleModule,Share],
  controllers: [TagController],
  providers: [TagService],
  exports:[TagService]
})
export class TagModule {}
