import { Injectable } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserInfo } from './entities/user-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {}

  async create(userInfo: UserInfo) {
    const data =await this.userRepository.save(userInfo);
    console.log(data)
    return data;
  }

  async login(userInfo: UserInfo) {
    const { nickname, password } = userInfo;
    const data =await this.isExistUser(nickname)
    const flag=await bcrypt.compare(password,data.password)
    if(data&&flag) {
      return data[0];
    }
    return null
  }

  async isExistUser(nickname:string) {
    const res=await this.userRepository.createQueryBuilder('userinfo')
      .select()
      .addSelect('userinfo.password')
      .where('userinfo.nickname=:nickname',{nickname})
      .getOne()
    return res
  }

  async register(registerUser:CreateUserInfoDto) {
    const userFlag=await this.isExistUser(registerUser.nickname)
    if(userFlag) {
      return null
    }

    const user=new UserInfo()
    user.nickname=registerUser.nickname
    user.password=bcrypt.hashSync(registerUser.password,10)
    return this.create(user)
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
