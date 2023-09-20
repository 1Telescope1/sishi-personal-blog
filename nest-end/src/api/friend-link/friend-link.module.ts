import { Module } from '@nestjs/common';
import { FriendLinkService } from './friend-link.service';
import { FriendLinkController } from './friend-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendLink } from './entities/friend-link.entity';
import { Share } from 'src/utils/share';

@Module({
  imports:[TypeOrmModule.forFeature([FriendLink]),Share],
  controllers: [FriendLinkController],
  providers: [FriendLinkService],
  exports:[FriendLinkService]
})
export class FriendLinkModule {}
