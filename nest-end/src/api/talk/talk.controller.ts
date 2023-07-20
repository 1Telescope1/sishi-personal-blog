import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TalkService } from './talk.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { Result } from 'src/common/result';
import { Talk } from './entities/talk.entity';

@Controller('talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Post()
  async create(@Body() createTalkDto: CreateTalkDto) {
    return new Result(await this.talkService.create(createTalkDto));
  }

  @Get()
  async findAll() {
    return new Result(await this.talkService.findAll());
  }

  @Get('all')
  async all() {
    return new Result(await this.talkService.all())
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.talkService.findOne(+id));
  }

  @Patch()
  async update(@Body() talk: Talk) {
    return new Result(await this.talkService.update(talk));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.talkService.remove(+id));
  }
}
