/* tslint:disable */
/* eslint-disable */
export interface TrainerShortDto {
  id: number;
  moduleId: number;
  name: string;
  nextLessonId?: number;
  nextTaskId?: number;
  nextTaskType?: 'trainer' | 'test';
  type: 'trainer' | 'test';
}
