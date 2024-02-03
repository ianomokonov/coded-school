/* tslint:disable */
/* eslint-disable */
import { ModuleDto } from '../models/module-dto';
export interface UserFullInfoDto {
  activeModules: Array<ModuleDto>;
  completedModules: Array<ModuleDto>;
  email: string;
  id: number;
  name: string;
}
