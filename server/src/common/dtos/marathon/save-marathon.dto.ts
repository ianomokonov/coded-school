import { MarathonDifficulty } from '@entities/marathon/marathon-difficulty';

export class SaveMarathonDto {
  name: string;
  points: number;
  difficulty: MarathonDifficulty;
  /** Ограничение по времмени в минутах */
  time?: number;
}
