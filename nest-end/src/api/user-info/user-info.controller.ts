import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { Result } from 'src/common/result';
import { UserInfo } from './entities/user-info.entity';

@Controller('userinfo')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  async create(@Body() userInfo: UserInfo) {
    return new Result(await this.userInfoService.create(userInfo));
  }

  @Post('login')
  async login(@Body() userInfo: UserInfo) {
    const data=await this.userInfoService.login(userInfo)
    return new Result(data)
  }

  @Get()
  async findAll() {
    return new Result(await this.userInfoService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.userInfoService.findOne(+id));
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
