import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TalkCommentService } from './talk-comment.service';
import { CreateTalkCommentDto } from './dto/create-talk-comment.dto';
import { UpdateTalkCommentDto } from './dto/update-talk-comment.dto';

@Controller('talk-comment')
export class TalkCommentController {
  constructor(private readonly talkCommentService: TalkCommentService) {}

  @Post()
  create(@Body() createTalkCommentDto: CreateTalkCommentDto) {
    return this.talkCommentService.create(createTalkCommentDto);
  }

  @Get()
  findAll() {
    return this.talkCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talkCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTalkCommentDto: UpdateTalkCommentDto) {
    return this.talkCommentService.update(+id, updateTalkCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talkCommentService.remove(+id);
  }
}
