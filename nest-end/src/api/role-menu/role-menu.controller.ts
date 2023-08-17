import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleMenuService } from './role-menu.service';
import { RoleMenu } from './entities/role-menu.entity';
import { Result } from 'src/common/result';


@Controller('role-menu')
export class RoleMenuController {
  constructor(private readonly roleMenuService: RoleMenuService) {}

  @Post()
  create(@Body() roleMenu: RoleMenu[]) {
    return new Result(this.roleMenuService.create(roleMenu));
  }


  @Get('role/:roleId')
  async findIdByRoleId(@Param('roleId') roleId:string) {
    return new Result(await this.roleMenuService.findIdByRoleId(+roleId))
  }

  @Delete('role/:roleId')
  async deleteIdByRoleId(@Param('roleId') roleId:string) {
    return new Result(await this.roleMenuService.deleteIdByRoleId(+roleId))
  }

}
