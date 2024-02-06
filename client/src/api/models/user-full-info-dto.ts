/* tslint:disable */
/* eslint-disable */
import { AchievementDto } from '../models/achievement-dto';
import { MarathonDto } from '../models/marathon-dto';
import { ModuleDto } from '../models/module-dto';
export interface UserFullInfoDto {
  achievements: Array<AchievementDto>;
  activeMarathones: Array<MarathonDto>;
  activeModules: Array<ModuleDto>;
  completedMarathones: Array<MarathonDto>;
  completedModules: Array<ModuleDto>;
  email: string;
  id: number;
  name: string;
  points: number;
}
