import { UserEntity } from '@entities/user/user.entity';
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
import { UserFullInfoDto } from '@dtos/user/user-full-info.dto';
import { UserShortDto } from '@dtos/user/user.dto';
import { ModuleDto } from '@dtos/module/module.dto';
import { MarathonDto } from '@dtos/marathon/marathon.dto';
import { AchievementDto } from '@dtos/achievment/achievement.dto';
import { ModuleEntity } from '@entities/module/module.entity';
import { MarathonEntity } from '@entities/marathon/marathon.entity';
import { AchievementEntity } from '@entities/achievement/achievement.entity';
import { PassportUserDto } from '@dtos/user/passport.user.dto';

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
      createMap(
        mapper,
        UserEntity,
        PassportUserDto,
        extend(UserEntity, UserShortDto),
        forMember(
          (destination) => destination.birthDate,
          mapFrom((source) => new Date(source.birthDate)),
        ),
      );
      createMap(
        mapper,
        UserEntity,
        UserFullInfoDto,
        extend(UserEntity, UserShortDto),
        forMember(
          (destination) => destination.activeModules,
          mapFrom((source) =>
            source.modules
              .filter((m) => !m.isCompleted)
              .map((m) => mapper.map(m.module, ModuleEntity, ModuleDto)),
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
