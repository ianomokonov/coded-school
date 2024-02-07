import { ModuleDto } from 'src/modules/module/dto/module.dto';
import { UserShortDto } from './user.dto';
import { MarathonDto } from 'src/modules/marathon/dto/marathon.dto';
import { AchievementDto } from 'src/modules/achievement/dto/achievement.dto';
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
