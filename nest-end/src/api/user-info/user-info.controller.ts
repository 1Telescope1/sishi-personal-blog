import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  create(@Body() createUserInfoDto: CreateUserInfoDto) {
    return this.userInfoService.create(createUserInfoDto);
  }

  @Get()
  findAll() {
    return this.userInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserInfoDto: UpdateUserInfoDto) {
    return this.userInfoService.update(+id, updateUserInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userInfoService.remove(+id);
  }
}
