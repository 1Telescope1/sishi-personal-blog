import { Injectable } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserInfo } from './entities/user-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {TalkComment} from "../talk-comment/entities/talk-comment.entity";

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {}

  create(userInfo: UserInfo) {
    const data = this.userRepository.save(userInfo);
    return data;
  }

  async login(userInfo: UserInfo) {
    const { nickname, password } = userInfo;
    const data =await this.userRepository.find({ where: { nickname, password } });
    return data[0];
  }

  findAll() {
    const data=this.userRepository.find()
    return data;
  }

  async findAllByPage(pageNum:number,pageSize:number,nickname:string) {
    const queryBuilder=await this.userRepository.createQueryBuilder('userinfo')
      .where('userinfo.nickname LIKE :nickname',{
        nickname:`%${nickname}%`
      })

    const data=await queryBuilder
      .select()
      .orderBy('userinfo.id','DESC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();
    const total=await queryBuilder.getCount();
    return { records: data, total, pageSize, pageNum };
  }

  async findOne(id: number) {
    const data=await this.userRepository.find({where:{id}})
    return data[0];
  }

  update(id: number, updateUserInfoDto: UpdateUserInfoDto) {
    return `This action updates a #${id} userInfo`;
  }

  remove(id: number,flag:number) {
    const data=this.userRepository.query('update t_user_info set is_disable=? where id =?',[flag,id])
    return data;
  }


}
