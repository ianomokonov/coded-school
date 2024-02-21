import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';

@Module({
  controllers: [TopicController],
  imports: [],
  providers: [TopicService],
})
export class TopicModule {}
