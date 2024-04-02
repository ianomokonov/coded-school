/* tslint:disable */
/* eslint-disable */
import { TestQuestionDto } from '../models/test-question-dto';
export interface SaveTestDto {
  name: string;
  questions: Array<TestQuestionDto>;
  topicId: number;
}
