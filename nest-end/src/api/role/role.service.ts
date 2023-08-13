import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {Role} from "./entities/role.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository:Repository<Role>) {
  }
   create(role: Role) {
    const data= this.roleRepository.save(role)
    return data;
  }

  findAll() {
    const data=this.roleRepository.find()
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    const data=this.roleRepository.createQueryBuilder()
      .update(Role)
      .set({
        isDisable:true
      })
      .where('id=:id',{id})
      .execute()
    return data;
  }
}
