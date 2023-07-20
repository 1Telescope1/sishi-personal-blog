import { PartialType } from '@nestjs/mapped-types';
import { CreateBackDto } from './create-back.dto';

export class UpdateBackDto extends PartialType(CreateBackDto) {}
