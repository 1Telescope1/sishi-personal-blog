import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  create(role: Role) {
    const data = this.roleRepository.save(role);
    return data;
  }

  findAll(roleName: string) {
    const data = this.roleRepository
      .createQueryBuilder('role')
      .where('role.roleName LIKE :roleName', {
        roleName: `%${roleName}%`,
      })
      .getMany();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    const data = this.roleRepository.delete(id)
    return data;
  }

  changeDisable(id:number,isDisable:number) {
    const data=this.roleRepository.query('update t_role set is_disable=? where id=?',[isDisable,id])
    return data
  }
}
