import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteDto } from '@dtos/note/note.dto';
import { NoteEntity } from '@entities/note/note.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { SaveNoteDto } from '@dtos/note/create-note.dto';
import { dateNow } from '@core/date-now.fn';
import { UpdateNoteDto } from '@dtos/note/update-note.dto';
import { GetAllNotesDto } from '@dtos/note/get-all-notes.dto';
import { FilesHelper } from 'src/utils/files-helper';

@Injectable()
export class NoteService {
  constructor(@InjectMapper() private mapper: Mapper) {}

  async getNotes(userId: number, query: GetAllNotesDto): Promise<NoteDto[]> {
    const notes = query.isFavorite
      ? await this.getFavoriteNotes(userId)
      : await this.getAllNotes(userId, query.moduleId);
    return notes.map((note) => this.mapper.map(note, NoteEntity, NoteDto));
  }

  private async getAllNotes(
    userId: number,
    moduleId?: number,
  ): Promise<NoteEntity[]> {
    return await NoteEntity.find({ where: { userId, moduleId } });
  }

  private async getFavoriteNotes(userId: number): Promise<NoteEntity[]> {
    return await NoteEntity.find({ where: { userId, isFavorite: true } });
  }

  async createNote(
    userId: number,
    dto: SaveNoteDto,
    files: Express.Multer.File[],
  ) {
    if (files?.length) {
      dto.content = await FilesHelper.uploadFilesWithReplace(
        files,
        dto.content,
      );
    }
    const { id } = await NoteEntity.create({
      ...dto,
      createDate: dateNow(),
      userId,
    }).save();
    return id;
  }

  async updateNote(
    noteId: number,
    dto: UpdateNoteDto,
    files: Express.Multer.File[],
  ) {
    if (dto.filesToDelete?.length) {
      await FilesHelper.removeFiles(dto.filesToDelete);
    }
    if (files?.length) {
      dto.content = await FilesHelper.uploadFilesWithReplace(
        files,
        dto.content,
      );
    }
    delete dto.filesToDelete;
    await NoteEntity.update(
      { id: noteId },
      {
        ...dto,
      },
    );
  }

  async deleteNote(noteId: number) {
    await NoteEntity.delete({ id: noteId });
  }

  async readNote(id: number): Promise<NoteDto> {
    const note = await NoteEntity.findOneBy({ id });
    if (note) {
      return note;
    }
    throw new NotFoundException('Заметка не найдена');
  }
}
