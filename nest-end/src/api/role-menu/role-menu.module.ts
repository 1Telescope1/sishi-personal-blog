import { Module } from '@nestjs/common';
import { RoleMenuService } from './role-menu.service';
import { RoleMenuController } from './role-menu.controller';

@Module({
  controllers: [RoleMenuController],
  providers: [RoleMenuService]
})
export class RoleMenuModule {}
