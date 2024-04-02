import { AutoMap } from '@automapper/classes';
import { TestQuestionDto } from './test-question.dto';
import { TrainerShortDto } from '../trainer-short.dto';

export class TestDto extends TrainerShortDto {
  @AutoMap(() => [TestQuestionDto])
  questions: TestQuestionDto[];
}
