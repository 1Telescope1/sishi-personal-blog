import { Injectable } from '@nestjs/common';
import { CreateRoleResourceDto } from './dto/create-role-resource.dto';
import { UpdateRoleResourceDto } from './dto/update-role-resource.dto';

@Injectable()
export class RoleResourceService {
  create(createRoleResourceDto: CreateRoleResourceDto) {
    return 'This action adds a new roleResource';
  }

  findAll() {
    return `This action returns all roleResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleResource`;
  }

  update(id: number, updateRoleResourceDto: UpdateRoleResourceDto) {
    return `This action updates a #${id} roleResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleResource`;
  }
}
