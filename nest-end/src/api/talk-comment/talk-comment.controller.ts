import { Controller, Get, Post, Body, Patch, Param, Delete,Query ,ParseIntPipe} from '@nestjs/common';
import { TalkCommentService } from './talk-comment.service';
import { CreateTalkCommentDto } from './dto/create-talk-comment.dto';
import { UpdateTalkCommentDto } from './dto/update-talk-comment.dto';
import { TalkComment } from './entities/talk-comment.entity';
import { Result } from 'src/common/result';

@Controller('talkcomment')
export class TalkCommentController {
  constructor(private readonly talkCommentService: TalkCommentService) {}

  @Post()
  async create(@Body() talkComment: TalkComment) {
    return new Result(await this.talkCommentService.create(talkComment));
  }

  @Get()
  async findAll() {
    return new Result(await this.talkCommentService.findAll())
  }

  @Get('page')
  async getTalkCommentByPage(@Query('pageNum',new  ParseIntPipe()) pageNum:number,
                             @Query('pageSize',new  ParseIntPipe()) pageSize:number,
                             @Query('nickname') nickname:string,
                             @Query('content') content:string) {
    return new Result(await this.talkCommentService.getTalkCommentByPage(pageNum,pageSize,nickname,content))
  }

  @Get('talk/:talkId')
  async findAllByTalk(@Param('talkId') talkId: string) {
    return new Result(await this.talkCommentService.findAllByTalk(+talkId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.talkCommentService.findOne(+id));
  }

  @Patch()
  async update(@Body() talkComment: TalkComment) {
    return new Result(await this.talkCommentService.update(talkComment));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.talkCommentService.remove(+id));
  }
}
