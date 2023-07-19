import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleMenuDto } from './create-role-menu.dto';

export class UpdateRoleMenuDto extends PartialType(CreateRoleMenuDto) {}
