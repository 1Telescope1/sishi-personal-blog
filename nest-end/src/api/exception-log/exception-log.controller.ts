import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ExceptionLogService } from './exception-log.service';
import { ExceptionLog } from './entities/exception-log.entity';
import { Result } from '../../common/result';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('exception-log')
export class ExceptionLogController {
  constructor(private readonly exceptionLogService: ExceptionLogService) {}

  @Post()
  async create(@Body() exceptionLog: ExceptionLog) {
    return new Result(await this.exceptionLogService.create(exceptionLog));
  }

  @Get()
  async findAll() {
    return new Result(await this.exceptionLogService.findAll());
  }

  @Get('page')
  async findPage(
    @Query('pageNum', new ParseIntPipe()) pageNum: number,
    @Query('pageSize', new ParseIntPipe()) pageSize: number,
    @Query('url') url: string,
    @Query('method') method: string,
  ) {
    return new Result(await this.exceptionLogService.findPage(pageNum,pageSize,url,method))
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exceptionLogService.findOne(+id);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.exceptionLogService.remove(+id));
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Post('ids')
  async removeLogs(@Body() ids: number[]) {
    return new Result(await this.exceptionLogService.removeLogs(ids));
  }
}
