import { AutoMap } from '@automapper/classes';
import { QuestionAnswerDto } from './question-answer.dto';

export class TestQuestionDto {
  id?: number;
  question: string;
  @AutoMap(() => [QuestionAnswerDto])
  answers: QuestionAnswerDto[];
}
