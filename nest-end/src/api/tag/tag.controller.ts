import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { Result } from 'src/common/result';
import { Tag } from './entities/tag.entity';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(JwtGuard,AdminGuard)
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


  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.tagService.remove(+id));
  }
}
