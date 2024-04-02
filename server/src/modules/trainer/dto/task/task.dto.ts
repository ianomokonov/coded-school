import { AutoMap } from '@automapper/classes';
import { FileDto } from '../files-tree.dto';
import { TrainerShortDto } from '../trainer-short.dto';
import { TrainerPatternDto } from './trainer-pattern.dto';

export class TaskDto extends TrainerShortDto {
  task: string;
  templatesDir: string;
  @AutoMap(() => [FileDto])
  files: FileDto[];
  @AutoMap(() => [FileDto])
  resultFiles?: FileDto[];
  @AutoMap(() => [TrainerPatternDto])
  patterns?: TrainerPatternDto[];
}
