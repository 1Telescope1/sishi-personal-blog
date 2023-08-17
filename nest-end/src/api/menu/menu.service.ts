import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import getMenuList from "../../utils/getMenuList";

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private readonly menuRepository:Repository<Menu>){}

  create(menu: Menu) {
    const data=this.menuRepository.save(menu)
    return data;
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

    const data=getMenuList(list)

    return data
  }


  getMenuByIds(ids:number[]) {
    return this.menuRepository.findByIds(ids);
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
