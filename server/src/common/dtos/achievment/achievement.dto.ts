import { AchievementEntity } from '@entities/achievement/achievement.entity';

export class AchievementDto {
  id: number;
  name: string;
  points: number;

  constructor(entity?: AchievementEntity) {
    this.id = entity?.id;
    this.name = entity?.name;
    this.points = entity?.points;
  }
}
