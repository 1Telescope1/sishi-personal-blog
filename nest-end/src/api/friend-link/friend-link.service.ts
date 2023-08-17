import { Injectable } from '@nestjs/common';
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

  async findAllByPage(
    pageNum: number,
    pageSize: number,
    linkName: string,
    linkAddress: string,
    linkIntro: string,
  ) {
    const queryBuilder = await this.friendLinkRepository
      .createQueryBuilder('friendLink')
      .where('friendLink.linkName LIKE :linkName', {
        linkName: `%${linkName}%`,
      })
      .andWhere('friendLink.linkAddress LIKE :linkAddress', {
        linkAddress: `%${linkAddress}%`,
      })
      .andWhere('friendLink.linkIntro LIKE :linkIntro', {
        linkIntro: `%${linkIntro}%`,
      });

    const data = await queryBuilder
      .select()
      .orderBy('friendLink.id', 'DESC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();

    const total = await queryBuilder.getCount();
    return { records: data, total, pageSize, pageNum };
  }

  findAllByStatus() {
    const data = this.friendLinkRepository.find({ where: { isStatus: true } });
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
    const data = this.friendLinkRepository.delete(id);
    return data;
  }
}
