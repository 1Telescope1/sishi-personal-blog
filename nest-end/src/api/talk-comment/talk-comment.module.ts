import { Module } from '@nestjs/common';
import { TalkCommentService } from './talk-comment.service';
import { TalkCommentController } from './talk-comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalkComment } from './entities/talk-comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TalkComment])],
  controllers: [TalkCommentController],
  providers: [TalkCommentService]
})
export class TalkCommentModule {}
