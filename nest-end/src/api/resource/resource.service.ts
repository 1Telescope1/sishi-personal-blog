import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResourceService {
  constructor(@InjectRepository(Resource) private readonly resourceRepository:Repository<Resource>){}

  create(createResourceDto: CreateResourceDto) {
    const data=this.resourceRepository.save(createResourceDto)
    return data;
  }

  findAll() {
    return `This action returns all resource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    const data=this.resourceRepository.delete(id)
    return data;
  }
}
