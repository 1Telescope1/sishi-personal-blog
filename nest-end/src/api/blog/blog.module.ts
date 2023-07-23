import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../article/entities/article.entity';
import { Tag } from '../tag/entities/tag.entity';
import { Talk } from '../talk/entities/talk.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Article,Tag,Talk])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
