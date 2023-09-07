import { Controller, Get, Post, Body, Req, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Result } from 'src/common/result';
import { ConfigService } from '@nestjs/config';
import {Chat} from "./entities/chat.entity";

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService,private configService: ConfigService) {}

  @Post()
  async create(@Body() chat: Chat,@Req() req:any) {
    return new Result(await this.chatService.create(chat,req));
  }

  @Get()
  async findAll(@Req() req) {
    
    const realIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return new Result(await this.chatService.findAll())
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
