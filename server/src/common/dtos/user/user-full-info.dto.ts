import { ModuleDto } from '@dtos/module/module.dto';
import { UserShortDto } from './user.dto';
import { MarathonDto } from '@dtos/marathon/marathon.dto';
import { AchievementDto } from '@dtos/achievment/achievement.dto';
import { AutoMap } from '@automapper/classes';

export class UserFullInfoDto extends UserShortDto {
  points: number;
  @AutoMap(() => [ModuleDto])
  activeModules: ModuleDto[];
  @AutoMap(() => [ModuleDto])
  completedModules: ModuleDto[];
  @AutoMap(() => [MarathonDto])
  activeMarathons: MarathonDto[];
  @AutoMap(() => [MarathonDto])
  completedMarathons: MarathonDto[];
  @AutoMap(() => [AchievementDto])
  achievements: AchievementDto[];
}
