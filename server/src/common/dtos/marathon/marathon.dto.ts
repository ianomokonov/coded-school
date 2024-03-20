import { AutoMap } from '@automapper/classes';
import { MarathonInfoDto } from './marathon-info.dto';

export class MarathonDto {
  @AutoMap(() => MarathonInfoDto)
  info: MarathonInfoDto;
  isCompleted?: boolean;
}
