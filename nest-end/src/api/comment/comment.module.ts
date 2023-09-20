import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import {UserInfo} from "../user-info/entities/user-info.entity";
import { Share } from 'src/utils/share';

@Module({
  imports:[TypeOrmModule.forFeature([Comment,UserInfo]),Share],
  controllers: [CommentController],
  providers: [CommentService],
  exports:[CommentService]
})
export class CommentModule {}
