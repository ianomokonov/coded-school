import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async create(userId: number, dto: CreateCommentDto) {
    const { id } = await CommentEntity.create({ userId, ...dto }).save();
    return id;
  }

  async update(id: number, dto: UpdateCommentDto) {
    await CommentEntity.update({ id }, { ...dto });
  }

  async delete(id: number) {
    await CommentEntity.delete({ id });
  }

  async getLessonComments(lessonId: number): Promise<CommentDto[]> {
    const comments = await CommentEntity.find({
      where: { lessonId },
      relations: { user: true, relativeComment: true },
      order: { createDate: { direction: 'DESC' } },
    });

    return this.mapper.mapArray(comments, CommentEntity, CommentDto);
  }
}
