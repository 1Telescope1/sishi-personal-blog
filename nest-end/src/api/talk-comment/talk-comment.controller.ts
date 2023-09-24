import { Controller, Get, Post, Body, Patch, Param, Delete,Query ,ParseIntPipe, UseGuards,Req} from '@nestjs/common';
import { TalkCommentService } from './talk-comment.service';
import { TalkComment } from './entities/talk-comment.entity';
import { Result } from 'src/common/result';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('talkcomment')
export class TalkCommentController {
  constructor(private readonly talkCommentService: TalkCommentService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() talkComment: TalkComment,@Req() req:any) {
    return new Result(await this.talkCommentService.create(talkComment,req));
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

  @UseGuards(JwtGuard,AdminGuard)
  @Patch()
  async update(@Body() talkComment: TalkComment) {
    return new Result(await this.talkCommentService.update(talkComment));
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.talkCommentService.remove(+id));
  }
}
