import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NoteService } from '@modules/note/note.service';
import { JwtAuthGuard } from '@guards/user/jwt.guard';
import { SaveNoteDto } from '@dtos/note/create-note.dto';
import { UserId } from '@decorators/author-id.decorator';
import { UpdateNoteDto } from '@dtos/note/update-note.dto';
import { GetAllNotesDto } from '@dtos/note/get-all-notes.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Notes')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({ summary: 'Получить список заметок' })
  async getAllNotes(@UserId() userId: number, @Query() query: GetAllNotesDto) {
    return this.noteService.getNotes(userId, query);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать заметку' })
  @UseInterceptors(FilesInterceptor('files'))
  async createNote(
    @UserId() userId: number,
    @Body() dto: SaveNoteDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.noteService.createNote(userId, dto, files);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить заметку' })
  @UseInterceptors(FilesInterceptor('files'))
  async updateNote(
    @Param('id') id: number,
    @Body() dto: UpdateNoteDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.noteService.updateNote(id, dto, files);
  }
  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить заметку' })
  async deleteNote(@Param('id') id: number) {
    return this.noteService.deleteNote(id);
  }
  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить заметку' })
  async readNote(@Param('id') id: number) {
    return this.noteService.readNote(id);
  }
}
