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
import { JwtAuthGuard } from '@guards/user/jwt.guard';
import { UserId } from '@decorators/author-id.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать комментарий' })
  async createComment(@UserId() userId: number, @Body() dto: CreateCommentDto) {
    return this.commentService.create(userId, dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить комментарий' })
  async updateComment(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
    return this.commentService.update(id, dto);
  }
  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить комментарий' })
  async deleteComment(@Param('id') id: number) {
    return this.commentService.delete(id);
  }
  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить комментари урока' })
  async readLessonComments(@Param('id') lessonId: number) {
    return this.commentService.getLessonComments(lessonId);
  }
}
