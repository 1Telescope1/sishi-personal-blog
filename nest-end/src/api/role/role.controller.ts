import { Controller, Get, Post, Body, Param, Delete ,Query, UseGuards} from '@nestjs/common';
import { RoleService } from './role.service';
import {Role} from "./entities/role.entity";
import {Result} from "../../common/result";
import {RoleMenu} from "../role-menu/entities/role-menu.entity";
import {RoleResource} from "../role-resource/entities/role-resource.entity";
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtGuard,AdminGuard)
  @Post()
  async create(@Body() role: Role) {
    return new Result(await this.roleService.create(role));
  }

  @Get()
  async findAll(@Query('roleName') roleName:string) {
    return new Result(await this.roleService.findAll(roleName));
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Post('menu')
  async updateRoleMenu(@Body() data:{roleId:number,roleMenu:RoleMenu[]}) {
    return new Result(await this.roleService.updateRoleMenu(data))
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Post('resource')
  async updateRoleResource(@Body() data:{roleId:number,roleResource:RoleResource[]}) {
    // var d1 = (new Date()).getTime();
    const flag=await this.roleService.updateRoleResource(data)
    // var d2 = (new Date()).getTime();
    // console.log(d2 - d1);//1ms
    return new Result(flag)
  }


  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.roleService.remove(+id));
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Get(':id/:isDisable')
  async changeDisable(@Param('id') id,@Param('isDisable') isDisable) {
    return new Result(await this.roleService.changeDisable(+id,isDisable))
  }
}
