import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BackService } from './back.service';
import { Back } from './entities/back.entity';
import { Result } from 'src/common/result';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { AdminGuard } from 'src/guards/admin/admin.guard';

@Controller('back')
export class BackController {
  constructor(private readonly backService: BackService) {}

  @UseGuards(JwtGuard,AdminGuard)
  @Post()
  async create(@Body() back: Back) {
    return new Result(await this.backService.create(back));
  }

  @Get()
  async findAll() {
    return new Result(await this.backService.findAll());
  }


  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.backService.remove(+id));
  }
}
