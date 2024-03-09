import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { LessonService } from './lesson/lesson.service';
import { LessonController } from './lesson/lesson.controller';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';

@Module({
  controllers: [TopicController, LessonController, CommentController],
  imports: [],
  providers: [TopicService, LessonService, CommentService],
})
export class TopicModule {}
