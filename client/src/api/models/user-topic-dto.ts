/* tslint:disable */
/* eslint-disable */
import { LessonDto } from '../models/lesson-dto';
export interface UserTopicDto {
  id: number;
  isCompleted: boolean;
  lessons: Array<LessonDto>;
  name: string;
}
