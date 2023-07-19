import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleResourceDto } from './create-role-resource.dto';

export class UpdateRoleResourceDto extends PartialType(CreateRoleResourceDto) {}
