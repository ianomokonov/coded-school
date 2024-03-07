/* tslint:disable */
/* eslint-disable */
import { TopicDto } from '../models/topic-dto';
import { UserModuleAchievementDto } from '../models/user-module-achievement-dto';
export interface UserModuleDto {
  achievements: Array<UserModuleAchievementDto>;
  completedTopicsCount: number;
  id: number;
  name: string;
  topics?: Array<TopicDto>;
  userModuleId: number;
}
