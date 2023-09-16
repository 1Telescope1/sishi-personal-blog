import { Controller, Get, Post, Body, Query, Param, Delete,Req, UseGuards,ParseIntPipe } from '@nestjs/common';
import { ViewsService } from './views.service';
import {Views} from "./entities/view.entity";
import {Result} from "../../common/result";
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

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

  @Get('page')
  async findPage(@Query('pageNum', new ParseIntPipe()) pageNum: number,
                 @Query('pageSize', new ParseIntPipe()) pageSize: number,
                 @Query('address') address: string) {
    return new Result(await this.viewsService.findPage(pageNum,pageSize,address))
  }

  @Get('cnt')
  async getCnt() {
    return new Result(await this.viewsService.getCnt())
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Post('ids')
  async removeIds(@Body() ids:number[]) {
    return new Result(await this.viewsService.removeIds(ids))
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.viewsService.remove(+id))
  }
}
