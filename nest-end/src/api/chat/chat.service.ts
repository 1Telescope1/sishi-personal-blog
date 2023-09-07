import { Injectable } from '@nestjs/common';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
  ) {}

  async create(chat: Chat, req: any) {
    const ip = req.ip;
    chat.ip = ip;
    if (req.user) chat.userId = req.user.userId;
    const data = this.chatRepository.save(chat);
    return data;
  }

  findAll() {
    const data=this.chatRepository.find()
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  removeIds(ids:number[]) {
    const data=this.chatRepository.delete(ids)
    return data
  }

  remove(id: number) {
    const data=this.chatRepository.delete(id)
    return data;
  }
}
