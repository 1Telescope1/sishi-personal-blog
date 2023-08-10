import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user-info.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserInfo])],
  controllers: [UserInfoController],
  providers: [UserInfoService],
  exports:[UserInfoService]
})
export class UserInfoModule {}
