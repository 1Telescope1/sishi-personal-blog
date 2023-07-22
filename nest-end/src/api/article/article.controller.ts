import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Result } from 'src/common/result';
import { Article } from './entities/article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() CreateArticleDto: CreateArticleDto) {
    return new Result(await this.articleService.create(CreateArticleDto));
  }

  @Get()
  async findAll() {
    return new Result(await this.articleService.findAll());
  }

  @Get('page')
  async findPage(
    @Query('pageNum', new ParseIntPipe()) pageNum: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
    @Query('articleTitle') articleTitle: string,
    @Query('articleContent') articleContent: string,
    @Query('tagId') tagId:string
  ) {
    const data = await this.articleService.findPage(
      pageNum,
      pageSize,
      articleTitle,
      articleContent,
      tagId
    );
    return new Result(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.articleService.findOne(+id));
  }

  @Patch()
  async update(@Body() Article: Article) {
    return new Result(await this.articleService.update(Article));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.articleService.remove(+id));
  }
}
