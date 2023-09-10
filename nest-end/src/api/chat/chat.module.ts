import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import {Share} from "../../utils/share";

@Module({
  imports:[TypeOrmModule.forFeature([Chat]),Share],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
