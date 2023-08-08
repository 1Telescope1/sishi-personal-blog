import { Controller,Query, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import {File} from "./entities/file.entity";
import {Result} from "../../common/result";

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  async create(@Body() file: File) {
    return new Result(await this.fileService.create(file));
  }

  @Get()
  findAll() {
    return new Result(this.fileService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }


  @Get('isExit/url')
  async isExist(@Query('url') url: string) {
    return new Result(await this.fileService.isExist(url))
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
