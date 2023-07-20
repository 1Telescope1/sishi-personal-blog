import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Result } from 'src/common/result';
import { Message } from './entities/message.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.messageService.findOne(+id));
  }

  @Patch()
  async update(@Body() message: Message) {
    return new Result(await this.messageService.update(message));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.messageService.remove(+id));
  }
}
