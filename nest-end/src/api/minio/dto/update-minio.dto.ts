import { PartialType } from '@nestjs/mapped-types';
import { CreateMinioDto } from './create-minio.dto';

export class UpdateMinioDto extends PartialType(CreateMinioDto) {}
