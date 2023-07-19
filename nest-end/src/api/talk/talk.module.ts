import { Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';

@Module({
  controllers: [TalkController],
  providers: [TalkService]
})
export class TalkModule {}
