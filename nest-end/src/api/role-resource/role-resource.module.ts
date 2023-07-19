import { Module } from '@nestjs/common';
import { RoleResourceService } from './role-resource.service';
import { RoleResourceController } from './role-resource.controller';

@Module({
  controllers: [RoleResourceController],
  providers: [RoleResourceService]
})
export class RoleResourceModule {}
