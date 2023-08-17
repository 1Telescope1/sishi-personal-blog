import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Share } from 'src/utils/share';

@Module({
  imports:[TypeOrmModule.forFeature([Message]),Share],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
