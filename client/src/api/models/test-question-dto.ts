/* tslint:disable */
/* eslint-disable */
import { QuestionAnswerDto } from '../models/question-answer-dto';
export interface TestQuestionDto {
  answers: Array<QuestionAnswerDto>;
  id?: number;
  question: string;
}
