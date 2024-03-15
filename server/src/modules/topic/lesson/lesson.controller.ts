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
import { CreateLessonDto } from './dto/save-lesson.dto';
import { JwtAuthGuard } from '@guards/user/jwt.guard';
import { UserId } from '@decorators/author-id.decorator';

@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}
  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать урок' })
  async createLesson(@Body() dto: CreateLessonDto) {
    return this.lessonService.create(dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить урок' })
  async updateLesson(@Param('id') id: number, @Body() dto: CreateLessonDto) {
    return this.lessonService.update(id, dto);
  }
  @Put(':id/complete')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Завершить урок' })
  async completeLesson(@Param('id') id: number, @UserId() userId: number) {
    return this.lessonService.completeLesson(id, userId);
  }
  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить урок' })
  async deleteLesson(@Param('id') id: number) {
    return this.lessonService.delete(id);
  }
  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить урок' })
  async readLesson(@Param('id') id: number, @UserId() userId: number) {
    return this.lessonService.read(id, userId);
  }
}
