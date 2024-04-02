/* tslint:disable */
/* eslint-disable */
import { TestQuestionDto } from '../models/test-question-dto';
export interface TestDto {
  id: number;
  moduleId: number;
  name: string;
  nextLessonId?: number;
  nextTaskId?: number;
  nextTaskType?: 'trainer' | 'test';
  questions: Array<TestQuestionDto>;
  type: 'trainer' | 'test';
}
