import { Injectable, NotFoundException } from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from './entity/comment.entity';
import { GetCommentsDto } from './dto/get-comments.dto';
import { UserService } from '@modules/user/user.service';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { MailService } from '@mail/service';
import { FilesHelper } from 'src/utils/files-helper';

@Injectable()
export class CommentService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async create(
    userId: number,
    dto: CreateCommentDto,
    files: Express.Multer.File[],
  ) {
    const user = await this.userService.getUserWithRoles(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (files?.length) {
      dto.text = await FilesHelper.uploadFilesWithReplace(files, dto.text);
    }
    const { id } = await CommentEntity.create({ userId, ...dto }).save();
    if (true || !user.roles.includes('admin')) {
      const admins = await this.userService.getAdmins();

      await Promise.all(
        admins.map(async (a) => {
          const data: ISendMailOptions = {
            to: a.email,
            subject: 'Новый коментарий CodedSchool',
            template: 'new-comment/template',
            context: {
              link: process.env.FRONT_URL + 'lesson/' + dto.lessonId,
              user,
              dto,
            },
          };
          await this.mailService.sendMail(data);
        }),
      );
    }

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
