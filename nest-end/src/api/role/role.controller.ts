import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import {Role} from "./entities/role.entity";
import {Result} from "../../common/result";

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() role: Role) {
    return new Result(await this.roleService.create(role));
  }

  @Get()
  async findAll() {
    return new Result(await this.roleService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.roleService.remove(+id));
  }
}
