import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BackService } from './back.service';
import { CreateBackDto } from './dto/create-back.dto';
import { UpdateBackDto } from './dto/update-back.dto';
import { Back } from './entities/back.entity';
import { Result } from 'src/common/result';

@Controller('back')
export class BackController {
  constructor(private readonly backService: BackService) {}

  @Post()
  async create(@Body() back: Back) {
    return new Result(await this.backService.create(back));
  }

  @Get()
  async findAll() {
    return new Result(await this.backService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBackDto: UpdateBackDto) {
    return this.backService.update(+id, updateBackDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.backService.remove(+id));
  }
}
