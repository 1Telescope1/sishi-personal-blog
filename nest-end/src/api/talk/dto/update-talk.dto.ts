import { PartialType } from '@nestjs/mapped-types';
import { CreateTalkDto } from './create-talk.dto';

export class UpdateTalkDto extends PartialType(CreateTalkDto) {}
