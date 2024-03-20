/* tslint:disable */
/* eslint-disable */
import { LessonDto } from '../models/lesson-dto';
export interface TopicDto {
  id: number;
  isCompleted?: boolean;
  lessons: Array<LessonDto>;
  name: string;
}
