/* tslint:disable */
/* eslint-disable */
import { TopicTreeDto } from '../models/topic-tree-dto';
export interface ModuleTreeDto {
  id: number;
  name: string;
  topics: Array<TopicTreeDto>;
}
