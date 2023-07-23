import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const data=await this.messageRepository.save(createMessageDto)
    const message=await this.messageRepository.createQueryBuilder('message')
    .leftJoin('message.user','userinfo')
    .addSelect(['userinfo.nickname', 'userinfo.avatar'])
    .where('message.isDelete=:isDelete',{isDelete:0})
    .andWhere(`message.id=:id`,{id:data.id})
    .getOne()
    return message;
  }

  findRecent() {
    const data=this.messageRepository
    .createQueryBuilder('message')
    .leftJoin('message.user','userinfo')
    .addSelect(['userinfo.nickname', 'userinfo.avatar'])
    .where('message.isDelete=:isDelete',{isDelete:0})
    .take(5)
    .orderBy('message.id',"DESC")
    .getMany()
    return data
  }

  findAll() {
    const data=this.messageRepository
    .createQueryBuilder('message')
    .leftJoin('message.user','userinfo')
    .addSelect(['userinfo.nickname', 'userinfo.avatar'])
    .where('message.isDelete=:isDelete',{isDelete:0})
    .getMany()
    return data;
  }

  findOne(id: number) {
    const data=this.messageRepository.createQueryBuilder('message')
    .leftJoin('message.user','userinfo')
    .addSelect(['userinfo.nickname', 'userinfo.avatar'])
    .where('message.isDelete=:isDelete',{isDelete:0})
    .andWhere(`message.id=:id`,{id})
    .getOne()
    return data;
  }

  update(message: Message) {
    const {id,commentContent,isDelete,isReview}=message
    const data=this.messageRepository.createQueryBuilder()
    .update(Message)
    .set({commentContent,isDelete,isReview})
    .where('id=:id',{id})
    .execute()
    return data;
  }

  remove(id: number) {
    const data = this.messageRepository
      .createQueryBuilder()
      .update(Message)
      .set({
        isDelete: 1,
      })
      .where('id=:id', { id })
      .execute();
    return data;
  }
}
