/* tslint:disable */
/* eslint-disable */
import { TopicChildDto } from '../models/topic-child-dto';
export interface TopicTreeDto {
  children: Array<TopicChildDto>;
  id: number;
  name: string;
}
