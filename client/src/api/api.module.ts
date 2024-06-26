/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { TrainerService } from './services/trainer.service';
import { UserService } from './services/user.service';
import { ModuleService } from './services/module.service';
import { MarathonService } from './services/marathon.service';
import { AchievementService } from './services/achievement.service';
import { NotesService } from './services/notes.service';
import { TopicService } from './services/topic.service';
import { LessonService } from './services/lesson.service';
import { CommentService } from './services/comment.service';
import { TrainerTaskService } from './services/trainer-task.service';
import { TrainerTestService } from './services/trainer-test.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    TrainerService,
    UserService,
    ModuleService,
    MarathonService,
    AchievementService,
    NotesService,
    TopicService,
    LessonService,
    CommentService,
    TrainerTaskService,
    TrainerTestService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
