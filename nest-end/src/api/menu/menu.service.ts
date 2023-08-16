import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
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

    const data=getMenuList(list)

    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  getMenuByIds(ids:number[]) {
    return this.menuRepository.findByIds(ids);
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
