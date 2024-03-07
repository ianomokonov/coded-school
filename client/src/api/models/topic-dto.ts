/* tslint:disable */
/* eslint-disable */
import { LessonDto } from '../models/lesson-dto';
export interface TopicDto {
  id: number;
  lessons: Array<LessonDto>;
  name: string;
}
