import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendLinkDto } from './create-friend-link.dto';

export class UpdateFriendLinkDto extends PartialType(CreateFriendLinkDto) {}
