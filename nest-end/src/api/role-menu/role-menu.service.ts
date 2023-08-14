import { Injectable } from '@nestjs/common';
import { CreateRoleMenuDto } from './dto/create-role-menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleMenu } from './entities/role-menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleMenuService {
  constructor(@InjectRepository(RoleMenu) private readonly roleMenuRepository:Repository<RoleMenu>) {
  }
  
  async create(roleMenu: RoleMenu[]) {
    for(let i=0;i<roleMenu.length;i++) {
      await this.roleMenuRepository.save(roleMenu[i])
    }
    return true;
  }

  findAll() {
    return `This action returns all roleMenu`;
  }

  findIdByRoleId(roleId:number) {
    const data=this.roleMenuRepository.query('select * from t_role_menu where role_id=?',[roleId])
    return data
  }

  deleteIdByRoleId(roleId:number) {
    const data=this.roleMenuRepository.query('delete from t_role_menu where role_id=?',[roleId])
    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} roleMenu`;
  }

  update(id: number, updateRoleMenuDto: UpdateRoleMenuDto) {
    return `This action updates a #${id} roleMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleMenu`;
  }
}
