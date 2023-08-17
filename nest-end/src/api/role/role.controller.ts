import { Controller, Get, Post, Body, Param, Delete ,Query} from '@nestjs/common';
import { RoleService } from './role.service';
import {Role} from "./entities/role.entity";
import {Result} from "../../common/result";
import {RoleMenu} from "../role-menu/entities/role-menu.entity";
import {RoleResource} from "../role-resource/entities/role-resource.entity";

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() role: Role) {
    return new Result(await this.roleService.create(role));
  }

  @Get()
  async findAll(@Query('roleName') roleName:string) {
    return new Result(await this.roleService.findAll(roleName));
  }

  @Post('menu')
  async updateRoleMenu(@Body() data:{roleId:number,roleMenu:RoleMenu[]}) {
    return new Result(await this.roleService.updateRoleMenu(data))
  }

  @Post('resource')
  async updateRoleResource(@Body() data:{roleId:number,roleResource:RoleResource[]}) {
    return new Result(await this.roleService.updateRoleResource(data))
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.roleService.remove(+id));
  }

  @Get(':id/:isDisable')
  async changeDisable(@Param('id') id,@Param('isDisable') isDisable) {
    return new Result(await this.roleService.changeDisable(+id,isDisable))
  }
}
