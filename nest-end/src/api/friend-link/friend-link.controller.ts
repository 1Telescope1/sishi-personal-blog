import { Controller, Get, Post,Query, ParseIntPipe,Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendLinkService } from './friend-link.service';
import { FriendLink } from './entities/friend-link.entity';
import { Result } from 'src/common/result';

@Controller('friendlink')
export class FriendLinkController {
  constructor(private readonly friendLinkService: FriendLinkService) {}

  @Post()
  async create(@Body() friendLink: FriendLink) {
    return new Result(await this.friendLinkService.create(friendLink));
  }

  @Get()
  async findAll() {
    return new Result(await this.friendLinkService.findAll());
  }

  @Get('page')
  async findAllByPage(@Query('pageNum', new ParseIntPipe()) pageNum: number,
                      @Query('pageSize', new ParseIntPipe()) pageSize: number,
                      @Query('linkName') linkName: string,
                      @Query('linkAddress') linkAddress: string,
                      @Query('linkIntro') linkIntro:string,) {
    const data=await this.friendLinkService.findAllByPage(pageNum,pageSize,linkName,linkAddress,linkIntro)

    return new Result(data)
  }

  @Get('status')
  async findAllByStatus() {
    return new Result(await this.friendLinkService.findAllByStatus())
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.friendLinkService.findOne(+id));
  }

  @Patch()
  async update(@Body() friendLink: FriendLink) {
    return new Result(await this.friendLinkService.update(friendLink));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new Result(await this.friendLinkService.remove(+id));
  }
}
