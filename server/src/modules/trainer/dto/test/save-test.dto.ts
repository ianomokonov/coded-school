import { TestQuestionDto } from './test-question.dto';

export class SaveTestDto {
  topicId: number;
  name: string;
  questions: TestQuestionDto[];
}
