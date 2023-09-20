import { Module } from '@nestjs/common';
import { TalkCommentService } from './talk-comment.service';
import { TalkCommentController } from './talk-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalkComment } from './entities/talk-comment.entity';
import {UserInfo} from "../user-info/entities/user-info.entity";
import { Share } from 'src/utils/share';

@Module({
  imports:[TypeOrmModule.forFeature([TalkComment,UserInfo]),Share],
  controllers: [TalkCommentController],
  providers: [TalkCommentService],
  exports:[TalkCommentService]
})
export class TalkCommentModule {}
