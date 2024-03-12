import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { LessonService } from './lesson/lesson.service';
import { LessonController } from './lesson/lesson.controller';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { UserModule } from '@modules/user/user.module';
import { MailService } from '@mail/service';

@Module({
  controllers: [TopicController, LessonController, CommentController],
  imports: [UserModule],
  providers: [TopicService, LessonService, CommentService, MailService],
})
export class TopicModule {}
