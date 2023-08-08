import { Controller, Get, Post, Body, Patch,ParseIntPipe, Param,Query, Delete } from '@nestjs/common';
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

  @Get('/page')
  async findAllByPage(@Query('pageNum',new  ParseIntPipe()) pageNum:number,
                      @Query('pageSize',new  ParseIntPipe()) pageSize:number,
                      @Query('nickname') nickname:string,) {
    return new Result(await this.userInfoService.findAllByPage(pageNum,pageSize,nickname))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.userInfoService.findOne(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserInfoDto: UpdateUserInfoDto) {
    return this.userInfoService.update(+id, updateUserInfoDto);
  }

  @Delete(':id/:flag')
  async remove(@Param('id') id: string,@Param('flag') flag:string) {
    console.log(id,flag)
    return new Result(await this.userInfoService.remove(+id,+flag));
  }
}
