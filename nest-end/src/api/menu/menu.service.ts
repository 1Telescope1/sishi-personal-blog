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

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    const data=this.menuRepository.createQueryBuilder()
      .update(Menu)
      .set({
        isHidden:true
      })
      .where("id=:id",{id})
      .execute()
    return data;
  }
}
