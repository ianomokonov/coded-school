/* tslint:disable */
/* eslint-disable */
import { TrainerPatternDto } from '../models/trainer-pattern-dto';
export interface UpdateTaskDto {
  filesToDelete?: Array<string>;
  name?: string;
  patterns?: Array<TrainerPatternDto>;
  task?: string;
  templatesDir?: string;
  topicId?: number;
}
