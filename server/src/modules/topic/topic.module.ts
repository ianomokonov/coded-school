import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { LessonService } from './lesson/lesson.service';
import { LessonController } from './lesson/lesson.controller';

@Module({
  controllers: [TopicController, LessonController],
  imports: [],
  providers: [TopicService, LessonService],
})
export class TopicModule {}
