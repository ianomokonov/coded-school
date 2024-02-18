import { AutoMap } from '@automapper/classes';
import { ModuleDto } from './module.dto';
import { UserTopicDto } from './user-topic.dto';
import { UserModuleAchievementDto } from '@dtos/user/user-achievement.dto';

export class UserModuleDto extends ModuleDto {
  completedTopicsCount: number;

  @AutoMap(() => [UserTopicDto])
  topics: UserTopicDto[];

  @AutoMap(() => [UserModuleAchievementDto])
  achievements: UserModuleAchievementDto[];
}
