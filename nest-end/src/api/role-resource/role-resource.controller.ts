import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleResourceService } from './role-resource.service';
import { CreateRoleResourceDto } from './dto/create-role-resource.dto';
import { UpdateRoleResourceDto } from './dto/update-role-resource.dto';
import { Result } from 'src/common/result';
import { RoleResource } from './entities/role-resource.entity';

@Controller('role-resource')
export class RoleResourceController {
  constructor(private readonly roleResourceService: RoleResourceService) {}

  @Post()
  create(@Body() roleResource: RoleResource[]) {
    return new Result(this.roleResourceService.create(roleResource));
  }

  @Get()
  findAll() {
    return this.roleResourceService.findAll();
  }

  @Get('role/:roleId')
  async findIdByRoleId(@Param('roleId') roleId:string) {
    return new Result(await this.roleResourceService.findIdByRoleId(+roleId))
  }

  @Delete('role/:roleId')
  async deleteIdByRoleId(@Param('roleId') roleId:string) {
    return new Result(await this.roleResourceService.deleteIdByRoleId(+roleId))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleResourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleResourceDto: UpdateRoleResourceDto) {
    return this.roleResourceService.update(+id, updateRoleResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleResourceService.remove(+id);
  }
}
