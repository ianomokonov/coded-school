import { TopicChildDto } from '@dtos/topic/topic-child.dto';
import { ModuleTreeDto } from './module-tree.dto';

export class AdminModuleDto {
  modules: ModuleTreeDto[];
  trainers: TopicChildDto[];
}
