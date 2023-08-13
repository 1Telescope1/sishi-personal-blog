import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import {Resource} from "./entities/resource.entity";
import {Result} from "../../common/result";

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  async create(@Body() resource: Resource) {
    return new Result(await this.resourceService.create(resource));
  }

  @Get()
  findAll() {
    return this.resourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourceService.update(+id, updateResourceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.resourceService.remove(+id));
  }
}
