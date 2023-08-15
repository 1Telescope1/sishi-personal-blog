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

  async findAllByName(resourceName:string) {
    const list=await this.resourceRepository.createQueryBuilder('resource')
      .where('resource.resourceName LIKE :resourceName',{
        resourceName:`%${resourceName}%`
      })
      .getMany()
    for (let i=0;i<list.length;i++) {
      list[i].children=[]
    }
    const data=list.filter(item=>item.parentId==null)
    const son=list.filter(item=>item.parentId!=null)

    const delIds=[]
    for(let i=0;i<data.length;i++) {
      for(let j=0;j<son.length;j++) {
        if(data[i].id==son[j].parentId) {
          data[i].children.push(son[j])
          delIds.push(son[j].id)
        }
      }
    }

    for(let i=0;i<son.length;i++) {
      if(!delIds.includes(son[i].id)) {
        data.push(son[i])
      }
    }

    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  getResourceByIds(ids:number[]) {
    return this.resourceRepository.findByIds(ids);
  }


  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  remove(id: number) {
    const data=this.resourceRepository.delete(id)
    return data;
  }
}
