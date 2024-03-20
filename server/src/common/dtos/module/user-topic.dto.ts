import { TopicEntity } from '@entities/topic/topic.entity';
import { TopicDto } from '../topic/topic.dto';

export class UserTopicDto extends TopicDto {
  isCompleted: boolean = false;

  lessonIds: number[];

  constructor(entity: TopicEntity) {
    super(entity);
    this.lessonIds = entity.lessons?.map((l) => l.id) || [];
  }
}
