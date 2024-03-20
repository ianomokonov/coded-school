/* tslint:disable */
/* eslint-disable */
export interface LessonDto {
  content: string;
  id: number;
  isCompleted?: boolean;
  moduleId: number;
  name: string;
  nextLessonId?: number;
  nextTaskId?: number;
  topicId: number;
}
