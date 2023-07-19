import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRoleDto } from './create-user-role.dto';

export class UpdateUserRoleDto extends PartialType(CreateUserRoleDto) {}
