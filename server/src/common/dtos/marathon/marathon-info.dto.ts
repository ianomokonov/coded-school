import { AutoMap } from '@automapper/classes';
import { MarathonDifficulty } from '@entities/marathon/marathon-difficulty';
import { TrainerShortDto } from '@modules/trainer/dto/trainer-short.dto';

export class MarathonInfoDto {
  id: number;
  name: string;
  difficulty: MarathonDifficulty;
  points: number;
  time?: number;
  @AutoMap(() => [TrainerShortDto])
  trainers?: TrainerShortDto[];
}
