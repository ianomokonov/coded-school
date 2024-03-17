import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/save-lesson.dto';
import { JwtAuthGuard } from '@guards/user/jwt.guard';
import { UserId } from '@decorators/author-id.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}
  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать урок' })
  @UseInterceptors(FilesInterceptor('files'))
  async createLesson(
    @Body() dto: CreateLessonDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.lessonService.create(dto, files);
  }

  @Post(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить урок' })
  @UseInterceptors(FilesInterceptor('files'))
  async updateLesson(
    @Param('id') id: number,
    @Body() dto: UpdateLessonDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.lessonService.update(id, dto, files);
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
