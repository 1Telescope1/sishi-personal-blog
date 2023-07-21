import { Injectable } from '@nestjs/common';
import { CreateFriendLinkDto } from './dto/create-friend-link.dto';
import { UpdateFriendLinkDto } from './dto/update-friend-link.dto';
import { FriendLink } from './entities/friend-link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FriendLinkService {
  constructor(
    @InjectRepository(FriendLink)
    private readonly friendLinkRepository: Repository<FriendLink>,
  ) {}

  create(friendLink: FriendLink) {
    const data = this.friendLinkRepository.save(friendLink);
    return data;
  }

  findAll() {
    const data = this.friendLinkRepository.find();
    return data;
  }

  findOne(id: number) {
    const data = this.friendLinkRepository.find({ where: { id } });
    return data;
  }

  update(friendLink: FriendLink) {
    const { id, linkName, linkAvatar, linkAddress, linkIntro, isStatus } =
      friendLink;
    const data = this.friendLinkRepository
      .createQueryBuilder()
      .update(FriendLink)
      .set({
        linkName,
        linkAvatar,
        linkAddress,
        linkIntro,
        isStatus,
      })
      .where('id=:id', { id })
      .execute();
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} friendLink`;
  }
}
