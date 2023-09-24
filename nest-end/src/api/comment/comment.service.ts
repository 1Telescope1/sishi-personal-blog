import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import transformData from "../../utils/transformData";
import {UserInfo} from "../user-info/entities/user-info.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>

  ) {}

  create(comment: Comment,req:any) {
    const {user}=req
    comment.userId=user.userId
    const data = this.commentRepository.save(comment);
    return data;
  }

  async findAllByArticle(articleId: number) {
    const list = await this.commentRepository
      .createQueryBuilder('comment')
      .select()
      .leftJoin('comment.userinfo', 'userinfo')
      .addSelect(['userinfo.id', 'userinfo.nickname', 'userinfo.avatar'])
      .leftJoin('comment.article', 'article')
      .addSelect(['article.articleTitle', 'article.id'])
      .where('comment.isDelete=:isDelete', { isDelete: 0 })
      .andWhere('comment.articleId=:articleId', { articleId })
      .getMany();

    const data = list.filter((item) => item.parentId == null);
    for (let i = 0; i < list.length; i++) {
      list[i].children = [];
      list[i].replyInfo = { id: null, nickname: null, avatar: null };
    }
    const replyList = list.filter((item) => item.replyCommentId != null);
    let children = list.filter((item) => item.parentId != null);

    for (let i = 0; i < replyList.length; i++) {
      for (let j = 0; j < children.length; j++) {
        if (replyList[i].replyCommentId == children[j].id) {
          replyList[i].replyInfo = children[j].userinfo;
        }
      }
    }

    children = Array.from(new Set([...children, ...replyList]));
    children.sort((a, b) => a.id - b.id);

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < children.length; j++) {
        if (data[i].id == children[j].parentId) {
          data[i].children.push(children[j]);
        }
      }
    }
    return data;
  }

  async getCommentByPage(
    pageNum: number,
    pageSize: number,
    nickname: string,
    title: string,
    content: string,
  ) {
    const totalResult = await this.commentRepository.query(
      'select count(*) as total from t_comment as c left join t_user_info as u on c.user_id=u.id left join t_article a on a.id=c.article_id where u.nickname like ? and c.comment_content like ? and a.article_title like ? and c.is_delete=0 ',
      [`%${nickname}%`, `%${content}%`,`%${title}%`, (pageNum - 1) * pageSize, pageSize],
    )
    const data = await this.commentRepository.query(
      'select c.*,u.nickname,u.avatar,a.article_title,a.article_cover from t_comment as c left join t_user_info as u on c.user_id=u.id left join t_article a on a.id=c.article_id where u.nickname like ? and c.comment_content like ? and a.article_title like ? and c.is_delete=0 order by id desc limit ?,?',
      [`%${nickname}%`, `%${content}%`,`%${title}%`, (pageNum - 1) * pageSize, pageSize],
    );
    const transformedResult=transformData(data)
    for(let i=0;i<transformedResult.length;i++) {
      if(transformedResult[i].replyCommentId) {
        const comment=await this.commentRepository.createQueryBuilder('comment')
          .select('comment.userId')
          .where('comment.id=:id',{id:transformedResult[i].replyCommentId})
          .getOne()
        const replyUser=await this.userInfoRepository.createQueryBuilder('userinfo')
          .select(['userinfo.nickname','userinfo.avatar'])
          .where('userinfo.id=:id',{id:comment.userId})
          .getOne()
        transformedResult[i].replyUser=replyUser
      }
    }


    return { records: transformedResult, total:Number(totalResult[0].total), pageSize, pageNum };
  }

  findOne(id: number) {
    const data = this.commentRepository
      .createQueryBuilder('comment')
      .select()
      .leftJoin('comment.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .leftJoin('comment.article', 'article')
      .addSelect(['article.articleTitle', 'article.id'])
      .where('comment.isDelete=:isDelete', { isDelete: 0 })
      .andWhere('comment.id=:id', { id })
      .getOne();
    return data;
  }


  remove(id: number) {
    const data = this.commentRepository.delete(id);
    return data;
  }
}
