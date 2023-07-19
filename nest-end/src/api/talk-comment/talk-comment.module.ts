import { Module } from '@nestjs/common';
import { TalkCommentService } from './talk-comment.service';
import { TalkCommentController } from './talk-comment.controller';

@Module({
  controllers: [TalkCommentController],
  providers: [TalkCommentService]
})
export class TalkCommentModule {}
