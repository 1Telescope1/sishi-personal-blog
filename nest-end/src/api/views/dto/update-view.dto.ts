import { PartialType } from '@nestjs/mapped-types';
import { CreateViewDto } from './create-view.dto';

export class UpdateViewDto extends PartialType(CreateViewDto) {}
