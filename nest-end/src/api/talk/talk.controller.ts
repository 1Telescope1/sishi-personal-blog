import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TalkService } from './talk.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { Result } from 'src/common/result';
import { Talk } from './entities/talk.entity';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @UseGuards(JwtGuard,AdminGuard)
  @Post()
  async create(@Body() createTalkDto: CreateTalkDto) {
    return new Result(await this.talkService.create(createTalkDto));
  }

  @Get()
  async findAll() {
    return new Result(await this.talkService.findAll());
  }

  @Get('all')
  async all() {
    return new Result(await this.talkService.all())
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.talkService.findOne(+id));
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Patch()
  async update(@Body() talk: Talk) {
    return new Result(await this.talkService.update(talk));
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.talkService.remove(+id));
  }
}
