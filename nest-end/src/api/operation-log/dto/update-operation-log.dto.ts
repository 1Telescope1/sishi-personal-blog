import { PartialType } from '@nestjs/mapped-types';
import { CreateOperationLogDto } from './create-operation-log.dto';

export class UpdateOperationLogDto extends PartialType(CreateOperationLogDto) {}
