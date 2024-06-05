import { Controller, Query, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { File } from "./entities/file.entity";
import { Result } from "../../common/result";
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post()
  async create(@Body() file: File) {
    console.log(file, 123);

    return new Result(await this.fileService.create(file));
  }

  @Get()
  async findAll() {
    return new Result(await this.fileService.findAll());
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.fileService.remove(+id));
  }


  @Get('isExit/url')
  async isExist(@Query('url') url: string) {
    return new Result(await this.fileService.isExist(url))
  }

}
