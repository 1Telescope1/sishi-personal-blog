import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';

@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService]
})
export class UserRoleModule {}
