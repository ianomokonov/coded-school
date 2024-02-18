/* tslint:disable */
/* eslint-disable */
import { UserModuleAchievementDto } from '../models/user-module-achievement-dto';
import { UserTopicDto } from '../models/user-topic-dto';
export interface UserModuleDto {
  achievements: Array<UserModuleAchievementDto>;
  completedTopicsCount: number;
  id: number;
  name: string;
  topics: Array<UserTopicDto>;
}
