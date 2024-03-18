import { MarathonDifficulty } from '@entities/marathon/marathon-difficulty';
import { TrainerShortDto } from '@modules/trainer/dto/trainer-short.dto';

export class SaveMarathonDto {
  name: string;
  points: number;
  difficulty: MarathonDifficulty;
  /** Ограничение по времмени в минутах */
  time?: number;
  trainers?: TrainerShortDto[];
}
