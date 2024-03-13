/* tslint:disable */
/* eslint-disable */
import { FileDto } from '../models/file-dto';
export interface TrainerDto {
  files?: Array<FileDto>;
  id: number;
  name: string;
  nextLessonId?: number;
  nextTaskId?: number;
  task: string;
}
