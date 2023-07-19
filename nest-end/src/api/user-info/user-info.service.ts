import { Injectable } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserInfoService {
  create(createUserInfoDto: CreateUserInfoDto) {
    return 'This action adds a new userInfo';
  }

  findAll() {
    return `This action returns all userInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInfo`;
  }

  update(id: number, updateUserInfoDto: UpdateUserInfoDto) {
    return `This action updates a #${id} userInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInfo`;
  }
}
