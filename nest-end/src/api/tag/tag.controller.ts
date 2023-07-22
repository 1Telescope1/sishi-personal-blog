import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Result } from 'src/common/result';
import { Tag } from './entities/tag.entity';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@Body() tag:Tag) {
    return new Result(await this.tagService.create(tag));
  }

  @Get()
  async findAll() {
    return new Result(await this.tagService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.tagService.findOne(+id));
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.tagService.remove(+id));
  }
}
