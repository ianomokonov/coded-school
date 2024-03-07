import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LessonService } from './lesson.service';
import { SaveLessonDto } from './dto/save-lesson.dto';
import { JwtAuthGuard } from '@guards/user/jwt.guard';

@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}
  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать урок' })
  async createTopic(@Body() dto: SaveLessonDto) {
    return this.lessonService.create(dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить урок' })
  async updateTopic(@Param('id') id: number, @Body() dto: SaveLessonDto) {
    return this.lessonService.update(id, dto);
  }
  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить урок' })
  async deleteTopic(@Param('id') id: number) {
    return this.lessonService.delete(id);
  }
  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить урок' })
  async readTopic(@Param('id') id: number) {
    return this.lessonService.read(id);
  }
}
