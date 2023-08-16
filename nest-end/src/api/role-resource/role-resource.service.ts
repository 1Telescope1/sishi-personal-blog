import { Injectable } from '@nestjs/common';
import { CreateRoleResourceDto } from './dto/create-role-resource.dto';
import { UpdateRoleResourceDto } from './dto/update-role-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleResource } from './entities/role-resource.entity';
import { Repository } from 'typeorm';
import transformData from 'src/utils/transformData';

@Injectable()
export class RoleResourceService {
  constructor(@InjectRepository(RoleResource) private readonly roleResourceRepository:Repository<RoleResource>){}

  async create(roleResource: RoleResource[]) {    
    for(let i=0;i<roleResource.length;i++) {
      await this.roleResourceRepository.save(roleResource[i])      
    }
    return true
  }

  findAll() {
    return `This action returns all roleResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleResource`;
  }

  async findIdByRoleId(roleId:number) {
    const data=await this.roleResourceRepository.query('select resource_id resourceId from t_role_resource where role_id=?',[roleId])

    return data
  }

  deleteIdByRoleId(roleId:number) {
    const data=this.roleResourceRepository.query('delete from t_role_resource where role_id=?',[roleId])
    return data
  }

  update(id: number, updateRoleResourceDto: UpdateRoleResourceDto) {
    return `This action updates a #${id} roleResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} roleResource`;
  }
}
