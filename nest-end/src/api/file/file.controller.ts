import { Controller,Query, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileService } from './file.service';
import {File} from "./entities/file.entity";
import {Result} from "../../common/result";

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  async create(@Body() file: File) {
    return new Result(await this.fileService.create(file));
  }


  @Get('isExit/url')
  async isExist(@Query('url') url: string) {
    return new Result(await this.fileService.isExist(url))
  }

}
