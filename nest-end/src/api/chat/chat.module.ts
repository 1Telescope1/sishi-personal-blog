import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import {Share} from "../../utils/share";
import {UserInfoService} from "../user-info/user-info.service";
import {UserInfo} from "../user-info/entities/user-info.entity";
import {RoleMenu} from "../role-menu/entities/role-menu.entity";
import {Menu} from "../menu/entities/menu.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Chat,UserInfo,RoleMenu,Menu]),Share],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
