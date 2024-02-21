import { AchievementDto } from '@dtos/achievment/achievement.dto';
import { AchievementEntity } from '@entities/achievement/achievement.entity';

export class UserModuleAchievementDto extends AchievementDto {
  isCompleted: boolean;

  constructor(entity: AchievementEntity) {
    super(entity);
  }
}
