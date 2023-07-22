import { PartialType } from '@nestjs/mapped-types';
import { CreateLoginDto } from './create-login.dto';

export class UpdateLoginDto extends PartialType(CreateLoginDto) {}
