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
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Result } from 'src/common/result';
import { Article } from './entities/article.entity';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  
  @UseGuards(JwtGuard,AdminGuard)
  @Post()
  async create(@Body() article: Article) {
    return new Result(await this.articleService.create(article));
  }

  @Get()
  async findAll() {
    return new Result(await this.articleService.findAll());
  }

  @Get("recent")
  async getRecentArticle() {
    return new Result(await this.articleService.getRecentArticle())
  }

  @Get('page')
  async findPage(
    @Query('pageNum', new ParseIntPipe()) pageNum: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
    @Query('articleTitle') articleTitle: string,
    @Query('articleContent') articleContent: string,
    @Query('tagId') tagId:string,
    @Query('categoryId') categoryId:string,
    @Query('type') type:string
  ) {
    const data = await this.articleService.findPage(
      pageNum,
      pageSize,
      articleTitle,
      articleContent,
      tagId,
      categoryId,
      type
    );
    return new Result(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.articleService.findOne(+id));
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Patch()
  async update(@Body() Article: Article) {
    return new Result(await this.articleService.update(Article));
  }
  
  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.articleService.remove(+id));
  }

  @Get('test')
  async test(@Query('articleTitle') articleTitle: string){
    return new Result(123);
  }
}

