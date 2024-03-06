import { MarathonDifficulty } from '@entities/marathon/marathon-difficulty';

export class MarathonDto {
  id: number;
  name: string;
  difficulty: MarathonDifficulty;
  points: number;
}
