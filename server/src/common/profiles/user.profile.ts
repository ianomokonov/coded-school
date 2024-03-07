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
import { NoteEntity } from '@entities/note/note.entity';
import { NoteDto } from '@dtos/note/note.dto';
import * as process from 'process';
import { UserModuleEntity } from '@entities/module/user-module.entity';
import { UserModuleDto } from '@dtos/module/user-module.dto';
import { UserTopicDto } from '@dtos/module/user-topic.dto';
import { UserModuleAchievementDto } from '@dtos/user/user-achievement.dto';
import { UserMarathonEntity } from '@entities/marathon/user-marathon.entity';
import { TopicEntity } from '@entities/topic/topic.entity';
import { TopicDto } from '@dtos/topic/topic.dto';
import { LessonEntity } from '@modules/topic/lesson/entity/lesson.entity';
import { LessonDto } from '@modules/topic/lesson/dto/lesson.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, UserEntity, UserShortDto);
      createMap(mapper, NoteEntity, NoteDto);
      createMap(mapper, ModuleEntity, ModuleDto);
      createMap(mapper, MarathonEntity, MarathonDto);
      createMap(mapper, AchievementEntity, AchievementDto);
      createMap(mapper, TopicEntity, TopicDto);
      createMap(mapper, LessonEntity, LessonDto);
      createMap(
        mapper,
        UserMarathonEntity,
        MarathonDto,
        forMember(
          (dest) => dest.isCompleted,
          mapFrom((source) => source.isCompleted),
        ),
        forMember(
          (dest) => dest.info,
          mapFrom((source) => source.marathon),
        ),
      );
      createMap(
        mapper,
        UserEntity,
        PassportUserDto,
        extend(UserEntity, UserShortDto),
        forMember(
          (destination) => destination.birthDate,
          mapFrom((source) =>
            source.birthDate ? new Date(source.birthDate) : null,
          ),
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
              .map((m) => mapper.map(m, UserMarathonEntity, MarathonDto)),
          ),
        ),
        forMember(
          (destination) => destination.completedMarathons,
          mapFrom((source) =>
            source.marathons
              .filter((m) => m.isCompleted)
              .map((m) => mapper.map(m, UserMarathonEntity, MarathonDto)),
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
        forMember(
          (destination) => destination.referralCode,
          mapFrom(
            (source) =>
              `${process.env.FRONT_URL}sign-up?ref=${source.referralCode}`,
          ),
        ),
      );

      createMap(
        mapper,
        UserModuleEntity,
        UserModuleDto,
        extend(ModuleEntity, ModuleDto),
        extend(AchievementEntity, AchievementDto),
        forMember(
          (dest) => dest.name,
          mapFrom((source) => source.module.name),
        ),
        forMember(
          (dest) => dest.id,
          mapFrom((source) => source.module.id),
        ),
        forMember(
          (dest) => dest.userModuleId,
          mapFrom((source) => source.id),
        ),
        forMember(
          (destination) => destination.topics,
          mapFrom((source) =>
            source.module.topics.map((t) => {
              const result = new UserTopicDto(t);
              return result;
            }),
          ),
        ),
        forMember(
          (destination) => destination.achievements,
          mapFrom((source) =>
            source.module.achievements.map((a) => {
              const result = new UserModuleAchievementDto(a);
              result.isCompleted = !!source.user.achievements.find(
                (ua) => ua.achievementId === a.id,
              );
              return result;
            }),
          ),
        ),
      );
    };
  }

  // protected get mappingConfigurations(): MappingConfiguration[] {
  //   return [extend(UserEntity, UserShortDto)];
  // }
}
