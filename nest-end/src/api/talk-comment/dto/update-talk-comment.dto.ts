import { PartialType } from '@nestjs/mapped-types';
import { CreateTalkCommentDto } from './create-talk-comment.dto';

export class UpdateTalkCommentDto extends PartialType(CreateTalkCommentDto) {}
