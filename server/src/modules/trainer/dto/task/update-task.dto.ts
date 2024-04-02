import { TrainerPatternDto } from './trainer-pattern.dto';

export class UpdateTaskDto {
  topicId?: number;
  name?: string;
  templatesDir?: string;
  task?: string;
  filesToDelete?: string[];
  patterns?: TrainerPatternDto[];
}
