import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private readonly menuRepository:Repository<Menu>){}

  create(menu: Menu) {
    const data=this.menuRepository.save(menu)
    return data;
  }

  findAll() {
    return `This action returns all menu`;
  }

  async findAllByName(name:string) {
    const list=await this.menuRepository.createQueryBuilder('menu')
      .where('menu.name LIKE :name',{
        name:`%${name}%`
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
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    const data=this.menuRepository.delete(id)
    return data;
  }

  changeHidden(id:number,isHidden:number) {
    const data=this.menuRepository.query('update t_menu set is_hidden=? where id=?',[isHidden,id])
    return data;
  }
}
