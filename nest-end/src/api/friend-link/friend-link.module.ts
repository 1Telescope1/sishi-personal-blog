import { Module } from '@nestjs/common';
import { FriendLinkService } from './friend-link.service';
import { FriendLinkController } from './friend-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendLink } from './entities/friend-link.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FriendLink])],
  controllers: [FriendLinkController],
  providers: [FriendLinkService]
})
export class FriendLinkModule {}
