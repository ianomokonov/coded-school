import { ModuleDto } from 'src/modules/module/dto/module.dto';
import { UserShortDto } from './user.dto';
import { MarathonDto } from 'src/modules/marathon/dto/marathon.dto';
import { AchievementDto } from 'src/modules/achievement/dto/achievement.dto';

export class UserFullInfoDto extends UserShortDto {
  points: number;
  activeModules: ModuleDto[];
  completedModules: ModuleDto[];
  activeMarathones: MarathonDto[];
  completedMarathones: MarathonDto[];
  achievements: AchievementDto[];
}
