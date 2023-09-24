import { Injectable } from '@nestjs/common';
import { CreateTalkCommentDto } from './dto/create-talk-comment.dto';
import { UpdateTalkCommentDto } from './dto/update-talk-comment.dto';
import { TalkComment } from './entities/talk-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import transformData from "../../utils/transformData";
import {UserInfo} from "../user-info/entities/user-info.entity";

@Injectable()
export class TalkCommentService {
  constructor(
    @InjectRepository(TalkComment)
    private readonly talkCommentRepository: Repository<TalkComment>,
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>
  ) {}

  create(talkComment: TalkComment,req:any) {
    const {user}=req;
    talkComment.userId=user.userId
    const data = this.talkCommentRepository.save(talkComment);
    return data;
  }

  async findAll() {
    const data = await this.talkCommentRepository
      .createQueryBuilder('talkcomment')
      .select()
      .leftJoin('talkcomment.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .leftJoin('talkcomment.talk', 'talk')
      .addSelect(['talk.content', 'talk.id'])
      .where('talkcomment.isDelete=:isDelete', { isDelete: 0 })
      .getMany();
    return data;
  }

  async getTalkCommentByPage(
    pageNum: number,
    pageSize: number,
    nickname: string,
    content: string,
  ) {
    let totalResult = await this.talkCommentRepository.query(
      'select count(*) as total from t_talk_comment as tk left join t_user_info as u on tk.user_id=u.id where u.nickname like ? and tk.comment_content like ? and is_delete=0 ',
      [`%${nickname}%`, `%${content}%`, (pageNum - 1) * pageSize, pageSize],
    );

    const data = await this.talkCommentRepository.query(
      'select tk.*,u.nickname,u.avatar from t_talk_comment as tk left join t_user_info as u on tk.user_id=u.id where u.nickname like ? and tk.comment_content like ? and is_delete=0 order by id desc limit ?,?',
      [`%${nickname}%`, `%${content}%`, (pageNum - 1) * pageSize, pageSize],
    );
    const transformedResult=transformData(data)
    for(let i=0;i<transformedResult.length;i++) {
      if(transformedResult[i].replyCommentId) {
        const comment=await this.talkCommentRepository.createQueryBuilder('talkComment')
          .select('talkComment.userId')
          .where('talkComment.id=:id',{id:transformedResult[i].replyCommentId})
          .getOne()
        const replyUser=await this.userInfoRepository.createQueryBuilder('userinfo')
          .select(['userinfo.nickname','userinfo.avatar'])
          .where('userinfo.id=:id',{id:comment.userId})
          .getOne()
        transformedResult[i].replyUser=replyUser
      }
    }
    return { records: transformedResult,total:Number(totalResult[0].total), pageSize, pageNum };
  }

  async findAllByTalk(talkId: number) {
    const list = await this.talkCommentRepository
      .createQueryBuilder('talkcomment')
      .select()
      .leftJoin('talkcomment.userinfo', 'userinfo')
      .addSelect(['userinfo.id', 'userinfo.nickname', 'userinfo.avatar'])
      .where('talkcomment.isDelete=:isDelete', { isDelete: 0 })
      .andWhere('talkcomment.talkId=:talkId', { talkId })
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

  findOne(id: number) {
    const data = this.talkCommentRepository
      .createQueryBuilder('talkcomment')
      .select()
      .leftJoin('talkcomment.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .leftJoin('talkcomment.talk', 'talk')
      .addSelect(['talk.content', 'talk.id'])
      .where('talkcomment.id=:id', { id })
      .andWhere('talkcomment.isDelete=:isDelete', { isDelete: 0 })
      .getOne();
    return data;
  }

  update(talkComment: TalkComment) {
    const { id, commentContent, isDelete, isReview } = talkComment;
    const data = this.talkCommentRepository
      .createQueryBuilder()
      .update(TalkComment)
      .set({
        commentContent,
        isDelete,
        isReview,
      })
      .where('id=:id', { id })
      .execute();
    return data;
  }

  remove(id: number) {
    const data = this.talkCommentRepository
      .createQueryBuilder()
      .update(TalkComment)
      .set({
        isDelete: 1,
      })
      .where('id=:id', { id })
      .execute();
    return data;
  }
}
