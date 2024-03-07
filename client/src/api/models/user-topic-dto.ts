/* tslint:disable */
/* eslint-disable */
import { LessonDto } from '../models/lesson-dto';
export interface UserTopicDto {
  id: number;
  isCompleted: boolean;
  lessonIds: Array<number>;
  lessons: Array<LessonDto>;
  name: string;
}
