/* tslint:disable */
/* eslint-disable */
import { FileDto } from '../models/file-dto';
export interface TaskDto {
  files: Array<FileDto>;
  id: number;
  moduleId: number;
  name: string;
  nextLessonId?: number;
  nextTaskId?: number;
  nextTaskType?: 'trainer' | 'test';
  resultFiles?: Array<FileDto>;
  task: string;
  templatesDir: string;
  type: 'trainer' | 'test';
}
