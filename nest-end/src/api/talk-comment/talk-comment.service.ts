import { Injectable } from '@nestjs/common';
import { CreateTalkCommentDto } from './dto/create-talk-comment.dto';
import { UpdateTalkCommentDto } from './dto/update-talk-comment.dto';

@Injectable()
export class TalkCommentService {
  create(createTalkCommentDto: CreateTalkCommentDto) {
    return 'This action adds a new talkComment';
  }

  findAll() {
    return `This action returns all talkComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} talkComment`;
  }

  update(id: number, updateTalkCommentDto: UpdateTalkCommentDto) {
    return `This action updates a #${id} talkComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} talkComment`;
  }
}
