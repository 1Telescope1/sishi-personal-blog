import { Module } from '@nestjs/common';
import { RoleMenuService } from './role-menu.service';
import { RoleMenuController } from './role-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from './entities/role-menu.entity';
import { Share } from 'src/utils/share';

@Module({
  imports:[TypeOrmModule.forFeature([RoleMenu])],
  controllers: [RoleMenuController],
  providers: [RoleMenuService],
  exports:[RoleMenuService]
})
export class RoleMenuModule {}
