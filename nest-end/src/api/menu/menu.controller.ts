import { Controller, UseGuards,Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import {Menu} from "./entities/menu.entity";
import {Result} from "../../common/result";
import {JwtGuard} from "../../guards/jwt/jwt.guard";
import { AdminGuard } from 'src/guards/admin/admin.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtGuard,AdminGuard)
  @Post()
  async create(@Body() menu: Menu) {
    return new Result(await this.menuService.create(menu))
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAllByName(@Query('name') name:string) {
    return new Result(await this.menuService.findAllByName(name))
  }

  @Post("ids")
  async getMenuByIds(@Body() ids:number[]) {
    return new Result(await this.menuService.getMenuByIds(ids))
  }


  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.menuService.remove(+id));
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Get(':id/:isHidden')
  async changeHidden(@Param('id') id,@Param('isHidden') isHidden) {
    return new Result(await this.menuService.changeHidden(+id,isHidden))
  }
}
