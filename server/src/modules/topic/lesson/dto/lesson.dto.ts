import { TrainerType } from '@modules/trainer/entity/trainer-type';

export class LessonDto {
  id: number;
  name: string;
  moduleId: number;
  topicId: number;
  isCompleted?: boolean = false;
  content: string;
  nextLessonId?: number;
  nextTaskId?: number;
  nextTaskType?: TrainerType;
}
