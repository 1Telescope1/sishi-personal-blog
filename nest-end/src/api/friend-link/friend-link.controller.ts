import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendLinkService } from './friend-link.service';
import { CreateFriendLinkDto } from './dto/create-friend-link.dto';
import { UpdateFriendLinkDto } from './dto/update-friend-link.dto';
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new Result(await this.friendLinkService.findOne(+id));
  }

  @Patch()
  async update(@Body() friendLink: FriendLink) {
    return new Result(await this.friendLinkService.update(friendLink));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendLinkService.remove(+id);
  }
}
