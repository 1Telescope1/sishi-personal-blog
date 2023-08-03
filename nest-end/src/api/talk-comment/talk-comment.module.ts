import { Module } from '@nestjs/common';
import { TalkCommentService } from './talk-comment.service';
import { TalkCommentController } from './talk-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalkComment } from './entities/talk-comment.entity';
import {UserInfo} from "../user-info/entities/user-info.entity";

@Module({
  imports:[TypeOrmModule.forFeature([TalkComment,UserInfo])],
  controllers: [TalkCommentController],
  providers: [TalkCommentService]
})
export class TalkCommentModule {}
