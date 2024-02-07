/* tslint:disable */
/* eslint-disable */
import { MarathonDto } from '../models/marathon-dto';
import { ModuleDto } from '../models/module-dto';
export interface UserFullInfoDto {
  activeMarathons: Array<MarathonDto>;
  activeModules: Array<ModuleDto>;
  completedMarathons: Array<MarathonDto>;
  completedModules: Array<ModuleDto>;
  email: string;
  firstName: string;
  id: number;
  secondName?: string;
  surname?: string;
}
