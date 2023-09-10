import { Module } from '@nestjs/common';
import { ChatService } from '../api/chat/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../api/chat/entities/chat.entity';
import {WebsocketGateway} from "./websocket.gatway";

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ WebsocketGateway,ChatService],
})
export class WebsocketModule {}
