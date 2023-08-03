import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import {UserInfo} from "../user-info/entities/user-info.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Comment,UserInfo])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
