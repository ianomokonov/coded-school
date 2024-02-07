import { ModuleDto } from 'src/modules/module/dto/module.dto';
import { UserShortDto } from './user.dto';
import { MarathonDto } from 'src/modules/marathon/dto/marathon.dto';

export class UserFullInfoDto extends UserShortDto {
  activeModules: ModuleDto[];
  completedModules: ModuleDto[];
  activeMarathons: MarathonDto[];
  completedMarathons: MarathonDto[];
}
