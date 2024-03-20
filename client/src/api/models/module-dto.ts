/* tslint:disable */
/* eslint-disable */
import { TopicDto } from '../models/topic-dto';
export interface ModuleDto {
  id: number;
  name: string;
  topics?: Array<TopicDto>;
}
