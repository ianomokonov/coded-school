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
import { TopicService } from './topic.service';
import { SaveTopicDto } from '@dtos/topic/save-topic.dto';
import { JwtAuthGuard } from '@guards/user/jwt.guard';
import { UserId } from '@decorators/author-id.decorator';
import { MoveTopicChildDto } from '@dtos/topic/move-topic-child.dto';

@ApiTags('Topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}
  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Создать тему' })
  async createTopic(@Body() dto: SaveTopicDto) {
    return this.topicService.create(dto);
  }

  @Put('move-child')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить сортировку тренажеров и уроков' })
  async moveChild(@Body() dto: MoveTopicChildDto) {
    return this.topicService.moveChild(dto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Изменить тему' })
  async updateTopic(@Param('id') id: number, @Body() dto: SaveTopicDto) {
    return this.topicService.update(id, dto);
  }
  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Удалить тему' })
  async deleteTopic(@Param('id') id: number) {
    return this.topicService.delete(id);
  }
  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить тему' })
  async readTopic(@Param('id') id: number, @UserId() userId: number) {
    return this.topicService.read(id, userId);
  }
}
