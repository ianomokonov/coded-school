import { ModuleDto } from 'src/modules/module/dto/module.dto';
import { UserShortDto } from './user.dto';

export class UserFullInfoDto extends UserShortDto {
  activeModules: ModuleDto[];
  completedModules: ModuleDto[];
}
