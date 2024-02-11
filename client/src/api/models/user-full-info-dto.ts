/* tslint:disable */
/* eslint-disable */
import { AchievementDto } from '../models/achievement-dto';
import { MarathonDto } from '../models/marathon-dto';
import { ModuleDto } from '../models/module-dto';
export interface UserFullInfoDto {
  achievements: Array<AchievementDto>;
  activeMarathons: Array<MarathonDto>;
  activeModules: Array<ModuleDto>;
  completedMarathons: Array<MarathonDto>;
  completedModules: Array<ModuleDto>;
  email: string;
  firstName: string;
  id: number;
  points: number;
  referralCode: string;
  registrationDate: string;
  secondName?: string;
  surname?: string;
}
