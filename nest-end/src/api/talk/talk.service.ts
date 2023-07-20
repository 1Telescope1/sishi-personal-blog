import { Injectable } from '@nestjs/common';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk) private readonly talkRepository: Repository<Talk>,
  ) {}

  create(createTalkDto: CreateTalkDto) {
    const data = this.talkRepository.save(createTalkDto);
    return data;
  }

  findAll() {
    const data = this.talkRepository
      .createQueryBuilder('talk')
      .select()
      .leftJoin('talk.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .where('talk.status=:status', { status: 1 })
      .getMany();
    return data;
  }

  all() {
    const data = this.talkRepository
      .createQueryBuilder('talk')
      .select()
      .leftJoin('talk.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .getMany();
    return data;
  }

  findOne(id: number) {
    const data = this.talkRepository
      .createQueryBuilder('talk')
      .select()
      .leftJoin('talk.userinfo', 'userinfo')
      .addSelect(['userinfo.nickname', 'userinfo.avatar'])
      .where('talk.status=:status', { status: 1 })
      .andWhere('talk.id=:id', { id })
      .getOne();
    return data;
  }

  update(talk: Talk) {
    const { id, content, images, isTop, status } = talk;
    const data = this.talkRepository
      .createQueryBuilder()
      .update(Talk)
      .set({
        content,
        images,
        isTop,
        status,
      })
      .where('id=:id', { id })
      .execute();
    return data;
  }

  remove(id: number) {
    const data = this.talkRepository.delete(id);
    return data;
  }
}
