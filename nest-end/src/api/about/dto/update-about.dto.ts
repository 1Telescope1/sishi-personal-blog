import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutDto } from './create-about.dto';

export class UpdateAboutDto extends PartialType(CreateAboutDto) {}
