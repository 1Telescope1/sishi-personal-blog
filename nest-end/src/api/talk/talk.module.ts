import { Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Talk])],
  controllers: [TalkController],
  providers: [TalkService]
})
export class TalkModule {}
