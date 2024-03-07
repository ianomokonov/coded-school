import { AutoMap } from '@automapper/classes';
import { TopicEntity } from '@entities/topic/topic.entity';
import { LessonDto } from '@modules/topic/lesson/dto/lesson.dto';

export class TopicDto {
  id: number;
  name: string;
  isCompleted?: boolean = false;
  @AutoMap(() => [LessonDto])
  lessons: LessonDto[];

  constructor(entity?: TopicEntity) {
    this.id = entity?.id;
    this.name = entity?.name;
  }
}
