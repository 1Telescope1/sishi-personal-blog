import { Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { Share } from 'src/utils/share';

@Module({
  imports:[TypeOrmModule.forFeature([Talk]),Share],
  controllers: [TalkController],
  providers: [TalkService]
})
export class TalkModule {}
