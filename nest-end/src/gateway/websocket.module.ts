import { Module } from '@nestjs/common';
import { ChatService } from '../api/chat/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../api/chat/entities/chat.entity';
import {WebsocketGateway} from "./websocket.gatway";
import {UserInfoService} from "../api/user-info/user-info.service";
import {UserInfo} from "../api/user-info/entities/user-info.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Chat,UserInfo])],
  providers: [ WebsocketGateway,ChatService],
})
export class WebsocketModule {}
