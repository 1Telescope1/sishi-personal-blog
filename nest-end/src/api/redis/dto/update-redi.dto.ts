import { PartialType } from '@nestjs/mapped-types';
import { CreateRediDto } from './create-redi.dto';

export class UpdateRediDto extends PartialType(CreateRediDto) {}
