import {Controller, Get, Post, Body, Patch, Param, Delete, Query,ParseIntPipe, UseGuards} from '@nestjs/common';
import {MessageService} from './message.service';
import {CreateMessageDto} from './dto/create-message.dto';
import {Result} from 'src/common/result';
import {Message} from './entities/message.entity';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { DeleteGuard } from 'src/guards/delete/delete.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    return new Result(await this.messageService.create(createMessageDto));
  }

  @Get('recent')
  async findRecent() {
    return new Result(await this.messageService.findRecent())
  }

  @Get()
  async findAll() {
    return new Result(await this.messageService.findAll());
  }

  @Get('page')
  async getMessageByPage(@Query('pageNum', new ParseIntPipe()) pageNum: number,
                         @Query('pageSize', new ParseIntPipe()) pageSize: number,
                         @Query('nickname') nickname:string,
                         @Query('content') content:string) {
    return new Result(await this.messageService.getMessageByPage(pageNum,pageSize,nickname,content))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.messageService.findOne(+id));
  }

  @Patch()
  async update(@Body() message: Message) {
    return new Result(await this.messageService.update(message));
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.messageService.remove(+id));
  }
}
