import { Injectable } from '@nestjs/common';
import { NoteDto } from '@dtos/note/note.dto';
import { NoteEntity } from '@entities/note/note.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { SaveNoteDto } from '@dtos/note/create-note.dto';

@Injectable()
export class NoteService {
  constructor(@InjectMapper() private mapper: Mapper) {}

  async getAllNotes(): Promise<NoteDto[]> {
    const notes = await NoteEntity.find();
    console.log(notes);
    return notes.map((note) => this.mapper.map(note, NoteEntity, NoteDto));
  }

  async getFavoriteNotes(): Promise<NoteDto[]> {
    const notes = await NoteEntity.findBy({ isFavorite: true });
    return notes.map((note) => this.mapper.map(note, NoteEntity, NoteDto));
  }

  async createNote(dto: SaveNoteDto) {
    const { id } = await NoteEntity.create({ ...dto }).save();
    return id;
  }

  async updateNote(noteId: number, dto: SaveNoteDto) {
    await NoteEntity.update({ id: noteId }, { ...dto });
  }

  async deleteNote(noteId: number) {
    await NoteEntity.delete({ id: noteId });
  }

  async readNote(noteId: number): Promise<NoteDto> {
    return await NoteEntity.findOneBy({ id: noteId });
  }
}
