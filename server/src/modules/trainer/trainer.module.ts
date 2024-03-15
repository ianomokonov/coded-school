import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TopicModule } from '@modules/topic/topic.module';

@Module({
  controllers: [TrainerController],
  providers: [TrainerService],
  imports: [TopicModule],
})
export class TrainerModule {}
