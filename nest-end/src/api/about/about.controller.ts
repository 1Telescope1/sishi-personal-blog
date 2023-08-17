import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { Result } from 'src/common/result';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}


  @Get()
  async findAll() {
    return new Result(await this.aboutService.findAll());
  }

}
