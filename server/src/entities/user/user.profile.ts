import { UserEntity } from './user.entity';
import {
  createMap,
  extend,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { UserFullInfoDto } from '../../modules/user/dto/user-full-info.dto';
import { UserShortDto } from '../../modules/user/dto/user.dto';
import { ModuleDto } from '../../modules/module/dto/module.dto';
import { MarathonDto } from '../../modules/marathon/dto/marathon.dto';
import { AchievementDto } from '../../modules/achievement/dto/achievement.dto';
import { ModuleEntity } from '../module/module.entity';
import { MarathonEntity } from '../marathon/marathon.entity';
import { AchievementEntity } from '../achievement/achievement.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserEntity, UserShortDto);
      createMap(mapper, ModuleEntity, ModuleDto);
      createMap(mapper, MarathonEntity, MarathonDto);
      createMap(mapper, AchievementEntity, AchievementDto);
      createMap(mapper, ModuleEntity, ModuleDto);
      createMap(
        mapper,
        UserEntity,
        UserFullInfoDto,
        extend(UserEntity, UserShortDto),
        forMember(
          (destination) => destination.activeModules,
          mapFrom(
            (source) =>
              source.modules
                .filter((m) => !m.isCompleted)
                .map((m) => mapper.map(m.module, ModuleEntity, ModuleDto)),

            // mapper.map(
            //   source.modules.filter((m) => !m.isCompleted),
            //   UserModuleEntity,
            //   ModuleDto,
            // ),
          ),
        ),
        forMember(
          (destination) => destination.completedModules,
          mapFrom((source) =>
            source.modules
              .filter((m) => m.isCompleted)
              .map((m) => mapper.map(m.module, ModuleEntity, ModuleDto)),
          ),
        ),
        forMember(
          (destination) => destination.activeMarathons,
          mapFrom((source) =>
            source.marathons
              .filter((m) => !m.isCompleted)
              .map((m) => mapper.map(m.marathon, MarathonEntity, MarathonDto)),
          ),
        ),
        forMember(
          (destination) => destination.completedMarathons,
          mapFrom((source) =>
            source.marathons
              .filter((m) => m.isCompleted)
              .map((m) => mapper.map(m.marathon, MarathonEntity, MarathonDto)),
          ),
        ),
        forMember(
          (destination) => destination.achievements,
          mapFrom((source) =>
            source.achievements.map((a) =>
              mapper.map(a.achievement, AchievementEntity, AchievementDto),
            ),
          ),
        ),
      );
    };
  }

  // protected get mappingConfigurations(): MappingConfiguration[] {
  //   return [extend(UserEntity, UserShortDto)];
  // }
}
