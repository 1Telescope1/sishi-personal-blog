import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './entities/user-info.entity';
import {MenuModule} from "../menu/menu.module";
import {Share} from "../../utils/share";
import {RoleMenuModule} from "../role-menu/role-menu.module";

@Module({
  imports:[TypeOrmModule.forFeature([UserInfo]),RoleMenuModule,MenuModule,Share],
  controllers: [UserInfoController],
  providers: [UserInfoService],
  exports:[UserInfoService]
})
export class UserInfoModule {}
