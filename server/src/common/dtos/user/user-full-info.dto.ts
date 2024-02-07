import { ModuleDto } from '@dtos/module/module.dto';
import { UserShortDto } from './user.dto';
import { MarathonDto } from '@dtos/marathon/marathon.dto';
import { AchievementDto } from '@dtos/achievment/achievement.dto';

export class UserFullInfoDto extends UserShortDto {
  points: number;
  activeModules: ModuleDto[];
  completedModules: ModuleDto[];
  activeMarathons: MarathonDto[];
  completedMarathons: MarathonDto[];
  achievements: AchievementDto[];
}
