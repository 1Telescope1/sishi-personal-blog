import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TalkService } from './talk.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';

@Controller('talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Post()
  create(@Body() createTalkDto: CreateTalkDto) {
    return this.talkService.create(createTalkDto);
  }

  @Get()
  findAll() {
    return this.talkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTalkDto: UpdateTalkDto) {
    return this.talkService.update(+id, updateTalkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talkService.remove(+id);
  }
}
