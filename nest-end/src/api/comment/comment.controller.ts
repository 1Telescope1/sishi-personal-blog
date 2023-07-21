import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Result } from 'src/common/result';
import { Comment } from './entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() comment: Comment) {
    return new Result(await this.commentService.create(comment));
  }

  @Get('article/:articleId')
  async findAllByArticle(@Param('articleId') articleId:string) {
    return new Result(await this.commentService.findAllByArticle(+articleId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.commentService.findOne(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.commentService.remove(+id));
  }
}
