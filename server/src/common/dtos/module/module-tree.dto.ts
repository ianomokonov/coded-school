import { AutoMap } from '@automapper/classes';
import { TopicTreeDto } from '@dtos/topic/topic-tree.dto';

export class ModuleTreeDto {
  id: number;
  name: string;
  @AutoMap(() => [TopicTreeDto])
  topics: TopicTreeDto[];
}
