import { AutoMap } from '@automapper/classes';
import { TopicDto } from '@dtos/topic/topic.dto';

export class ModuleDto {
  id: number;
  name: string;

  @AutoMap(() => [TopicDto])
  topics?: TopicDto[];
}
