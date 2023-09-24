import { Controller, Get, Post, Body, Param, Delete,Query,ParseIntPipe, UseGuards,Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Result } from 'src/common/result';
import { Comment } from './entities/comment.entity';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() comment: Comment,@Req() req:any) {
    return new Result(await this.commentService.create(comment,req));
  }

  @Get('article/:articleId')
  async findAllByArticle(@Param('articleId') articleId:string) {
    return new Result(await this.commentService.findAllByArticle(+articleId));
  }

  @Get('page')
  async getCommentByPage(@Query('pageNum',new  ParseIntPipe()) pageNum:number,
                         @Query('pageSize',new  ParseIntPipe()) pageSize:number,
                         @Query('nickname') nickname:string,
                         @Query('title') title:string,
                         @Query('content') content:string) {
    return new Result(await  this.commentService.getCommentByPage(pageNum,pageSize,nickname,title,content))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.commentService.findOne(+id));
  }


  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.commentService.remove(+id));
  }
}
