import { AutoMap } from '@automapper/classes';
import { FileDto } from './files-tree.dto';

export class TrainerDto {
  id: number;
  name: string;
  task: string;
  nextLessonId?: number;
  nextTaskId?: number;
  @AutoMap(() => [FileDto])
  files?: FileDto[];
}
