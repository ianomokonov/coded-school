import { TopicEntity } from '@entities/topic/topic.entity';

export class TopicDto {
  id: number;
  name: string;

  constructor(entity?: TopicEntity) {
    this.id = entity?.id;
    this.name = entity?.name;
  }
}