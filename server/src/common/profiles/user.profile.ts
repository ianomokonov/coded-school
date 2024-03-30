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
import { CommentEntity } from '@modules/topic/comment/entity/comment.entity';
import { CommentDto } from '@modules/topic/comment/dto/comment.dto';
import { TrainerEntity } from '@modules/trainer/entity/trainer.entity';
import { TaskDto } from '@modules/trainer/dto/task/task.dto';
import { ModuleTreeDto } from '@dtos/module/module-tree.dto';
import { TopicTreeDto } from '@dtos/topic/topic-tree.dto';
import { TopicChildDto } from '@dtos/topic/topic-child.dto';
import { MarathonInfoDto } from '@dtos/marathon/marathon-info.dto';
import { TrainerShortDto } from '@modules/trainer/dto/trainer-short.dto';
import { TrainerQuestionEntity } from '@modules/trainer/entity/trainer-question.entity';
import { TestQuestionDto } from '@modules/trainer/dto/test/test-question.dto';
import { QuestionAnswerEntity } from '@modules/trainer/entity/question-answer.entity';
import { QuestionAnswerDto } from '@modules/trainer/dto/test/question-answer.dto';
import { TestDto } from '@modules/trainer/dto/test/test.dto';

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
      createMap(mapper, QuestionAnswerEntity, QuestionAnswerDto);
      createMap(mapper, TrainerQuestionEntity, TestQuestionDto);
      createMap(mapper, MarathonEntity, MarathonDto);
      createMap(mapper, TrainerEntity, TestDto);
      createMap(
        mapper,
        TrainerEntity,
        TrainerShortDto,
        forMember(
          (d) => d.nextTaskType,
          mapFrom((s) => s.nextTask?.type),
        ),
      );
      createMap(
        mapper,
        MarathonEntity,
        MarathonInfoDto,
        forMember(
          (d) => d.trainers,
          mapFrom((s) =>
            s.trainers?.map((t) =>
              mapper.map(t.trainer, TrainerEntity, TrainerShortDto),
            ),
          ),
        ),
      );
      createMap(mapper, AchievementEntity, AchievementDto);
      createMap(mapper, TopicEntity, TopicDto);
      createMap(
        mapper,
        LessonEntity,
        LessonDto,
        forMember(
          (d) => d.nextTaskType,
          mapFrom((s) => s.nextTask?.type),
        ),
      );
      createMap(mapper, CommentEntity, CommentDto);
      createMap(mapper, TrainerEntity, TaskDto);
      createMap(mapper, ModuleEntity, ModuleTreeDto);
      createMap(
        mapper,
        LessonEntity,
        TopicChildDto,
        forMember(
          (d) => d.type,
          mapFrom(() => 'lesson'),
        ),
      );
      createMap(
        mapper,
        TrainerEntity,
        TopicChildDto,
        forMember(
          (d) => d.type,
          mapFrom((s) => s.type),
        ),
      );
      createMap(
        mapper,
        TopicEntity,
        TopicTreeDto,
        forMember(
          (d) => d.children,
          mapFrom((source) => {
            const result: TopicChildDto[] = [];
            let activeChild: TrainerEntity | LessonEntity = source.lessons.find(
              (l) =>
                !source.lessons.some((sl) => sl.nextLessonId === l.id) &&
                !source.trainers.some((sl) => sl.nextLessonId === l.id),
            );
            while (!!activeChild) {
              result.push(
                mapper.map(
                  activeChild,
                  activeChild instanceof LessonEntity
                    ? LessonEntity
                    : TrainerEntity,
                  TopicChildDto,
                ),
              );
              if (activeChild.nextLessonId) {
                activeChild = source.lessons.find(
                  (l) => l.id === activeChild.nextLessonId,
                );
                continue;
              }
              if (activeChild.nextTaskId) {
                activeChild = source.trainers.find(
                  (l) => l.id === activeChild.nextTaskId,
                );
                continue;
              }
              activeChild = null;
            }
            return result;
          }),
        ),
      );
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
          mapFrom((source) =>
            mapper.map(source.marathon, MarathonEntity, MarathonInfoDto),
          ),
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
