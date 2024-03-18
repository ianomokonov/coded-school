/* tslint:disable */
/* eslint-disable */
import { ModuleTreeDto } from '../models/module-tree-dto';
import { TopicChildDto } from '../models/topic-child-dto';
export interface AdminModuleDto {
  modules: Array<ModuleTreeDto>;
  trainers: Array<TopicChildDto>;
}
