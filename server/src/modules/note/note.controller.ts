import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from '@modules/note/note.service';
import { JwtAuthGuard } from '@guards/user/jwt.guard';
import { SaveNoteDto } from '@dtos/note/create-note.dto';
import { UserId } from '@decorators/author-id.decorator';

@ApiTags('Notes')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({ summary: 'Получить список заметок' })
  async getAllNotes(
    @UserId() userId: number,
    @Query('isFavorite', ParseBoolPipe) isFavorite: boolean,
  ) {
    return this.noteService.getNotes(userId, isFavorite);
  }

  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать заметку' })
  async createNote(@UserId() userId: number, @Body() dto: SaveNoteDto) {
    return this.noteService.createNote(userId, dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить заметку' })
  async updateNote(@Param('id') id: number, @Body() dto: SaveNoteDto) {
    return this.noteService.updateNote(id, dto);
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
