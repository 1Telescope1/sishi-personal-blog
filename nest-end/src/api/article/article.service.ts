import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Brackets, Like, Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(CreateArticleDto: CreateArticleDto) {
    const data = await this.articleRepository.save(CreateArticleDto);

    return data;
  }

  findPage(
    current: number,
    size: number,
    articleTitle: string,
    articleContent: string,
  ) {
    const data = this.articleRepository
      .createQueryBuilder('article')
      .select()
      .leftJoin('article.tag', 'tag')
      .addSelect('tag.tagName')
      .leftJoin('article.userinfo','userinfo')
      .addSelect(['userinfo.nickname','userinfo.avatar'])
      .where('article.articleTitle LIKE :articleTitle', {
        articleTitle: `%${articleTitle}%`,
      })
      .andWhere('article.articleContent LIKE :articleContent', {
        articleContent: `%${articleContent}%`,
      })
      .andWhere('article.isDelete=:isDelete', { isDelete: 0 })
      .skip((current - 1) * size)
      .take(size)
      .getMany();

    return data;
  }

  findAll() {
    return this.articleRepository.find();
  }

  findOne(id: number) {
    const data=this.articleRepository
    .createQueryBuilder('article')
    .select()
    .leftJoin('article.tag', 'tag')
    .addSelect('tag.tagName')
    .leftJoin('article.userinfo','userinfo')
      .addSelect(['userinfo.nickname','userinfo.avatar'])
    .where('article.id=:id',{id})
    .andWhere('article.isDelete=:isDelete', { isDelete: 0 })
    .getOne()
    return  data;
  }

  update(Article: Article) {
    const {
      id,
      categoryId,
      articleCover,
      articleTitle,
      articleContent,
      isTop,
      isFeatured,
      isDelete,
      status,
      type,
      password,
      originalUrl,
      tagId,
    } = Article;
    const data = this.articleRepository
      .createQueryBuilder()
      .update(Article)
      .set({
        id,
        categoryId,
        articleCover,
        articleTitle,
        articleContent,
        isTop,
        isFeatured,
        isDelete,
        status,
        type,
        password,
        originalUrl,
        tagId,
      })
      .where('id=:id', { id })
      .execute();
  }

  remove(id: number) {
    const data = this.articleRepository
      .createQueryBuilder()
      .update(Article)
      .set({
        isDelete: true,
      })
      .where('id=:id', { id })
      .execute();
    return data;
  }
}