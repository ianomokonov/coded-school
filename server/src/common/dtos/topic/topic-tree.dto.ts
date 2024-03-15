import { AutoMap } from '@automapper/classes';
import { TopicChildDto } from './topic-child.dto';

export class TopicTreeDto {
  id: number;
  name: string;
  @AutoMap(() => [TopicChildDto])
  children: TopicChildDto[];
}
