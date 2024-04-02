export class TopicChildDto {
  id: number;
  name: string;
  type: 'lesson' | 'trainer' | 'test';
  nextLessonId: number | null;
  nextTaskId: number | null;
}
