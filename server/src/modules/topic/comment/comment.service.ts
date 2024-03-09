import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './entity/comment.entity';
import { GetCommentsDto } from './dto/get-comments.dto';

@Injectable()
export class CommentService {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  async create(userId: number, dto: CreateCommentDto) {
    const { id } = await CommentEntity.create({ userId, ...dto }).save();
    return this.read(id);
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
  async read(id: number): Promise<CommentDto> {
    const comment = await CommentEntity.findOne({
      where: { id },
      relations: { user: true, relativeComment: true },
    });

    return this.mapper.map(comment, CommentEntity, CommentDto);
  }

  async getComments(query: GetCommentsDto): Promise<CommentDto[]> {
    const comments = await CommentEntity.find({
      relations: { user: true, relativeComment: true },
      order: { createDate: { direction: 'DESC' } },
      skip: query.skip,
      take: query.take,
    });

    return this.mapper.mapArray(comments, CommentEntity, CommentDto);
  }
}
