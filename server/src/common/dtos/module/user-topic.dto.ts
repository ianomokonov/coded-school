import { TopicEntity } from '@entities/topic/topic.entity';
import { TopicDto } from '../topic/topic.dto';

export class UserTopicDto extends TopicDto {
  isCompleted: boolean = false;

  constructor(entity: TopicEntity) {
    super(entity);
  }
}
