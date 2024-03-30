import { TrainerType } from '../entity/trainer-type';

export class TrainerShortDto {
  id: number;
  type: TrainerType;
  name: string;
  nextLessonId?: number;
  nextTaskId?: number;
  nextTaskType?: TrainerType;
}
