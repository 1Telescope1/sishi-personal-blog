import { PartialType } from '@nestjs/mapped-types';
import { CreateExceptionLogDto } from './create-exception-log.dto';

export class UpdateExceptionLogDto extends PartialType(CreateExceptionLogDto) {}
