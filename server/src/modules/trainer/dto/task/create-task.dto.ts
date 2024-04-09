import { TrainerPatternDto } from './trainer-pattern.dto';

export class CreateTaskDto {
  topicId: number;
  name: string;
  templatesDir: string;
  task: string;
  patterns?: TrainerPatternDto[];
}
