import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleMenuService } from './role-menu.service';
import { CreateRoleMenuDto } from './dto/create-role-menu.dto';
import { UpdateRoleMenuDto } from './dto/update-role-menu.dto';
import { RoleMenu } from './entities/role-menu.entity';
import { Result } from 'src/common/result';

@Controller('role-menu')
export class RoleMenuController {
  constructor(private readonly roleMenuService: RoleMenuService) {}

  @Post()
  create(@Body() roleMenu: RoleMenu[]) {
    return new Result(this.roleMenuService.create(roleMenu));
  }

  @Get()
  findAll() {
    return this.roleMenuService.findAll();
  }

  @Get('role/:roleId')
  async findIdByRoleId(@Param('roleId') roleId:string) {
    return new Result(await this.roleMenuService.findIdByRoleId(+roleId))
  }

  @Delete('role/:roleId')
  async deleteIdByRoleId(@Param('roleId') roleId:string) {
    return new Result(await this.roleMenuService.deleteIdByRoleId(+roleId))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleMenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleMenuDto: UpdateRoleMenuDto) {
    return this.roleMenuService.update(+id, updateRoleMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleMenuService.remove(+id);
  }
}
