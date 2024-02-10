import { Module } from '@nestjs/common';
import { NoteController } from '@modules/note/note.controller';
import { NoteService } from '@modules/note/note.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
