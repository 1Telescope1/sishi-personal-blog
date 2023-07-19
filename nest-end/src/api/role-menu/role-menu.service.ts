import { Injectable } from '@nestjs/common';
import { CreateRoleMenuDto } from './dto/create-role-menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role-menu.dto';

@Injectable()
export class RoleMenuService {
  create(createRoleMenuDto: CreateRoleMenuDto) {
    return 'This action adds a new roleMenu';
  }

  findAll() {
    return `This action returns all roleMenu`;
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
