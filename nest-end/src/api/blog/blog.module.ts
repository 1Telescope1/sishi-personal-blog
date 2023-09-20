import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../article/entities/article.entity';
import { Tag } from '../tag/entities/tag.entity';
import { Talk } from '../talk/entities/talk.entity';
import {Message} from "../message/entities/message.entity";
import {Views} from "../views/entities/view.entity";
import {UserInfo} from "../user-info/entities/user-info.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Article,Tag,Talk,Message,Views,UserInfo])],
  controllers: [BlogController],
  providers: [BlogService],
  exports:[BlogService]
})
export class BlogModule {}
