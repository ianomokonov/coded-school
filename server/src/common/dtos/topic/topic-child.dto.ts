export class TopicChildDto {
  id: number;
  name: string;
  type: 'lesson' | 'trainer';
  nextLessonId: number | null;
  nextTaskId: number | null;
}
