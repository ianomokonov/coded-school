/* tslint:disable */
/* eslint-disable */
import { FileDto } from '../models/file-dto';
import { TrainerPatternDto } from '../models/trainer-pattern-dto';
export interface TaskDto {
  files: Array<FileDto>;
  id: number;
  moduleId: number;
  name: string;
  nextLessonId?: number;
  nextTaskId?: number;
  nextTaskType?: 'trainer' | 'test';
  patterns?: Array<TrainerPatternDto>;
  resultFiles?: Array<FileDto>;
  task: string;
  templatesDir: string;
  type: 'trainer' | 'test';
}
