/* tslint:disable */
/* eslint-disable */
import { AchievementDto } from '../models/achievement-dto';
import { MarathonDto } from '../models/marathon-dto';
import { ModuleDto } from '../models/module-dto';
export interface UserFullInfoDto {
  activeMarathons: Array<MarathonDto>;
  achievements: Array<AchievementDto>;
  activeModules: Array<ModuleDto>;
  completedMarathons: Array<MarathonDto>;
  completedModules: Array<ModuleDto>;
  email: string;
  firstName: string;
  id: number;
  secondName?: string;
  surname?: string;
  points: number;
}
