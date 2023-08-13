import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
