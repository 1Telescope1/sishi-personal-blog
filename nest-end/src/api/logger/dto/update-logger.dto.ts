import { PartialType } from '@nestjs/mapped-types';
import { CreateLoggerDto } from './create-logger.dto';

export class UpdateLoggerDto extends PartialType(CreateLoggerDto) {}
