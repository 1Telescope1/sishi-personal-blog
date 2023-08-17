import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Share } from 'src/utils/share';

@Module({
  imports:[TypeOrmModule.forFeature([Tag]),Share],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
