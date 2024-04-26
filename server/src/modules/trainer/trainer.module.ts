import { Module } from '@nestjs/common';
import { TrainerController } from './controllers/trainer.controller';
import { TrainerService } from './services/trainer.service';
import { TopicModule } from '@modules/topic/topic.module';
import { TaskService } from './services/task.service';
import { TestService } from './services/test.service';
import { TaskController } from './controllers/task.controller';
import { TestController } from './controllers/test.controller';
import { ImageService } from './services/image.service';

@Module({
  controllers: [TrainerController, TaskController, TestController],
  providers: [TrainerService, TaskService, TestService, ImageService],
  imports: [TopicModule],
  exports: [TrainerService],
})
export class TrainerModule {}
