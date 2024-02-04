/* tslint:disable */
/* eslint-disable */
import { MarathonDto } from '../models/marathon-dto';
import { ModuleDto } from '../models/module-dto';
export interface UserFullInfoDto {
  activeMarathones: Array<MarathonDto>;
  activeModules: Array<ModuleDto>;
  completedMarathones: Array<MarathonDto>;
  completedModules: Array<ModuleDto>;
  email: string;
  id: number;
  name: string;
}
