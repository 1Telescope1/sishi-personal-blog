import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {Menu} from "./entities/menu.entity";
import {Result} from "../../common/result";

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() menu: Menu) {
    return new Result(await this.menuService.create(menu))
  }


  @Get()
  async findAllByName(@Query('name') name:string) {
    return new Result(await this.menuService.findAllByName(name))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Post("ids")
  async getMenuByIds(@Body() ids:number[]) {
    return new Result(await this.menuService.getMenuByIds(ids))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.menuService.remove(+id));
  }

  @Get(':id/:isHidden')
  async changeHidden(@Param('id') id,@Param('isHidden') isHidden) {
    return new Result(await this.menuService.changeHidden(+id,isHidden))
  }
}
