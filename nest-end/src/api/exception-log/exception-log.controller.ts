import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExceptionLogService } from './exception-log.service';
import {ExceptionLog} from "./entities/exception-log.entity";
import {Result} from "../../common/result";

@Controller('exception-log')
export class ExceptionLogController {
  constructor(private readonly exceptionLogService: ExceptionLogService) {}

  @Post()
  async create(@Body() exceptionLog: ExceptionLog) {
    return new Result(await this.exceptionLogService.create(exceptionLog))
  }

  @Get()
  async findAll() {
    return new Result(await this.exceptionLogService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exceptionLogService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exceptionLogService.remove(+id);
  }
}
