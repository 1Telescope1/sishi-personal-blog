import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleResourceService } from './role-resource.service';
import { CreateRoleResourceDto } from './dto/create-role-resource.dto';
import { UpdateRoleResourceDto } from './dto/update-role-resource.dto';

@Controller('role-resource')
export class RoleResourceController {
  constructor(private readonly roleResourceService: RoleResourceService) {}

  @Post()
  create(@Body() createRoleResourceDto: CreateRoleResourceDto) {
    return this.roleResourceService.create(createRoleResourceDto);
  }

  @Get()
  findAll() {
    return this.roleResourceService.findAll();
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
