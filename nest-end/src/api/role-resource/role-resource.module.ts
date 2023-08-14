import { Module } from '@nestjs/common';
import { RoleResourceService } from './role-resource.service';
import { RoleResourceController } from './role-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleResource } from './entities/role-resource.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RoleResource])],
  controllers: [RoleResourceController],
  providers: [RoleResourceService]
})
export class RoleResourceModule {}
