import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(article: Article) {
    const data = await this.articleRepository.save(article);

    return data;
  }

  async findPage(
    pageNum: number,
    pageSize: number,
    articleTitle: string,
    articleContent: string,
    tagId: string,
    categoryId: string,
    type: string,
  ) {
    const data = await this.articleRepository
      .createQueryBuilder('article')
      .select()
      .leftJoin('article.tag', 'tag')
      .addSelect(['tag.tagName', 'tag.id'])
      .leftJoin('article.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .where('article.articleTitle LIKE :articleTitle', {
        articleTitle: `%${articleTitle}%`,
      })
      .andWhere('article.articleContent LIKE :articleContent', {
        articleContent: `%${articleContent}%`,
      })
      .andWhere('article.tagId LIKE :tagId', {
        tagId: `%${tagId}%`,
      })
      // .andWhere('article.categoryId LIKE :categoryId',{
      //   categoryId:`%%`
      // })
      .andWhere('article.type LIKE :type', {
        type: `%${type}%`,
      })
      .andWhere('article.isDelete=:isDelete', { isDelete: 0 })
      .orderBy('article.id', 'DESC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();
    const total = await this.articleRepository.count();
    return { records: data, total, pageSize, pageNum };
  }

  findAll() {
    const data = this.articleRepository
      .createQueryBuilder('article')
      .select()
      .leftJoin('article.tag', 'tag')
      .addSelect('tag.tagName')
      .leftJoin('article.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .andWhere('article.isDelete=:isDelete', { isDelete: 0 })
      .orderBy('article.id', 'DESC')
      .getMany();
    return data;
  }

  findOne(id: number) {
    const data = this.articleRepository
      .createQueryBuilder('article')
      .select()
      .leftJoin('article.tag', 'tag')
      .addSelect('tag.tagName')
      .leftJoin('article.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .where('article.id=:id', { id })
      .andWhere('article.isDelete=:isDelete', { isDelete: 0 })
      .getOne();
    return data;
  }

  update(article: Article) {
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
    } = article;
    const data = this.articleRepository
      .createQueryBuilder()
      .update(Article)
      .set({
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
    return data;
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

  test( artitcleTitle: string) {
    const data=null
    // const data = this.articleRepository.query(
    //   'select * from t_article where  article_title like ?',
    //   [artitcleTitle],
    // );
    return data;
  }
}
