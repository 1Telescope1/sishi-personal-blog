import { Injectable } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import transformData from '../../utils/transformData';
import { UserInfo } from '../user-info/entities/user-info.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    @InjectRepository(UserInfo)
    private readonly userinfoRepository: Repository<UserInfo>,
  ) {}

  async create(chat: Chat, req: any) {
    const ip = req.ip;
    chat.ip = ip.replace('::ffff:', '');
    const userinfo = await this.userinfoRepository
      .createQueryBuilder('user')
      .where('user.id=:id', { id: chat.userId })
      .getOne();
    chat.userId = userinfo.id;
    chat.avatar = userinfo.avatar;
    chat.nickname = userinfo.nickname;

    const data = await this.chatRepository.save(chat);
    return data;
  }

  async findAll() {
    const data = await this.chatRepository.query(
      `select tc.*,tu.nickname,tu.avatar from t_chat tc left join t_user_info tu on tc.userId=tu.id`,
    );
    const transformedResult = transformData(data);
    return transformedResult;
  }

  async findTen() {
    const data=await this.chatRepository.query('select tc.*,tu.nickname,tu.avatar from t_chat tc left join t_user_info tu on tc.userId=tu.id order by tc.id desc limit 10')
    const transformedResult = transformData(data);
    return transformedResult
  }

  async findPage(pageNum: number, pageSize: number, content: string) {
    const totalResult = await this.chatRepository.query(
      'select count(*) as total from t_chat tc left join t_user_info tu on tc.userId=tu.id where tc.content like ?',
      [`%${content}%`],
    );

    const data = await this.chatRepository.query(
      'select tc.*,tu.nickname,tu.avatar from t_chat tc left join t_user_info tu on tc.userId=tu.id where tc.content like ? order by id desc limit ?,?',
      [`%${content}%`,(pageNum - 1) * pageSize, pageSize],
    );

    const transformedResult=transformData(data)


    return { records: transformedResult,total:Number(totalResult[0].total), pageSize, pageNum };
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  removeIds(ids: number[]) {
    const data = this.chatRepository.delete(ids);
    return data;
  }

  remove(id: number) {
    const data = this.chatRepository.delete(id);
    return data;
  }
}
