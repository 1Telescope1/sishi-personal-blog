import { Controller, Get, Post, Body, Patch, Param, Delete,Req } from '@nestjs/common';
import { ViewsService } from './views.service';
import {Views} from "./entities/view.entity";
import {Result} from "../../common/result";

@Controller('views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @Post()
  async create(@Body() views: any,@Req() req:any) {
    return new Result(await this.viewsService.create(views,req))
  }

  @Get()
  async findAll() {
    return new Result(await this.viewsService.findAll())
  }

  @Get('cnt')
  async getCnt() {
    return new Result(await this.viewsService.getCnt())
  }

  @Get()
  async removeIds(@Body() ids:number[]) {
    return new Result(await this.viewsService.removeIds(ids))
  }



  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.viewsService.remove(+id))
  }
}
