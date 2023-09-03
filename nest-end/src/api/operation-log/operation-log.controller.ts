import { Controller, Get, Post, Body, Query, Param, Delete, UseGuards,ParseIntPipe } from '@nestjs/common';
import { OperationLogService } from './operation-log.service';
import {Result} from "../../common/result";
import {OperationLog} from "./entities/operation-log.entity";
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { AdminGuard } from 'src/guards/admin/admin.guard';

@Controller('operation-log')
export class OperationLogController {
  constructor(private readonly operationLogService: OperationLogService) {}

  @Post()
  async create(@Body() operationLog:OperationLog) {
    return new Result(await this.operationLogService.create(operationLog))
  }

  @Get()
  async findAll() {
    return new Result(await this.operationLogService.findAll())
  }

  @Get('page')
  async findPage(
    @Query('pageNum', new ParseIntPipe()) pageNum: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
    @Query('url') url: string,
    @Query('method') method: string,
  ) {
    return new Result(await this.operationLogService.findPage(pageNum,pageSize,url,method))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationLogService.findOne(+id);
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.operationLogService.remove(+id))
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Post('ids')
  async removeLogs(@Body() ids:number[]) {
    return new Result(await this.operationLogService.removeLogs(ids))
  }


}
