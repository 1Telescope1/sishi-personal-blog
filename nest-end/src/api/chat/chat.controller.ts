import { Controller, Get, Post, Body, Req, Param, Delete, UseGuards,Query,ParseIntPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Result } from 'src/common/result';
import {Chat} from "./entities/chat.entity";
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() chat: Chat,@Req() req:any) {
    return new Result(await this.chatService.create(chat,req));
  }

  @Get()
  async findAll() {
    return new Result(await this.chatService.findAll())
  }

  @Get('ten')
  async findTen() {
    return new Result(await this.chatService.findTen())
  }

  @Get('page')
  async findPage(@Query('pageNum', new ParseIntPipe()) pageNum: number,
                 @Query('pageSize', new ParseIntPipe()) pageSize: number,
                 @Query('content') content: string) {
    return new Result(await this.chatService.findPage(pageNum,pageSize,content))

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Post('ids')
  async removeIds(@Body() ids:number[]) {
    return new Result(await this.chatService.removeIds(ids))
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.chatService.remove(+id));
  }
}
