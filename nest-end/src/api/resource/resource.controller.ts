import { Controller, Get, Post, Body, Patch, Param, Delete,Query, UseGuards } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import {Resource} from "./entities/resource.entity";
import {Result} from "../../common/result";
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @UseGuards(JwtGuard,AdminGuard)
  @Post()
  async create(@Body() resource: Resource) {
    return new Result(await this.resourceService.create(resource));
  }

  @Get()
  async findAllByName(@Query('resourceName') resourceName:string) {
    return new Result(await this.resourceService.findAllByName(resourceName))
  }


  @Post("ids")
  async getResourceByIds(@Body() ids:number[]) {
    return new Result(await this.resourceService.getResourceByIds(ids))
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.resourceService.remove(+id));
  }
}
