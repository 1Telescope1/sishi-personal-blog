import { Module } from '@nestjs/common';
import { RoleMenuService } from './role-menu.service';
import { RoleMenuController } from './role-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleMenu } from './entities/role-menu.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RoleMenu])],
  controllers: [RoleMenuController],
  providers: [RoleMenuService]
})
export class RoleMenuModule {}
