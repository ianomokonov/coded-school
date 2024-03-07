import { MarathonDifficulty } from '@entities/marathon/marathon-difficulty';

export class MarathonInfoDto {
  id: number;
  name: string;
  difficulty: MarathonDifficulty;
  points: number;
  time?: number;
}
