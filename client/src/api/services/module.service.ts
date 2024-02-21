/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { completeUserModule } from '../fn/module/complete-user-module';
import { CompleteUserModule$Params } from '../fn/module/complete-user-module';
import { createUserModule } from '../fn/module/create-user-module';
import { CreateUserModule$Params } from '../fn/module/create-user-module';
import { deleteUserModule } from '../fn/module/delete-user-module';
import { DeleteUserModule$Params } from '../fn/module/delete-user-module';
import { getAllModules } from '../fn/module/get-all-modules';
import { GetAllModules$Params } from '../fn/module/get-all-modules';
import { ModuleDto } from '../models/module-dto';
import { readUserModule } from '../fn/module/read-user-module';
import { ReadUserModule$Params } from '../fn/module/read-user-module';
import { startUserModule } from '../fn/module/start-user-module';
import { StartUserModule$Params } from '../fn/module/start-user-module';
import { updateUserModule } from '../fn/module/update-user-module';
import { UpdateUserModule$Params } from '../fn/module/update-user-module';
import { UserModuleDto } from '../models/user-module-dto';

@Injectable({ providedIn: 'root' })
export class ModuleService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllModules()` */
  static readonly GetAllModulesPath = '/api/module/all';

  /**
   * Получить список модулей.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllModules()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllModules$Response(params?: GetAllModules$Params, context?: HttpContext): Observable<BaseResponse<Array<ModuleDto>>> {
    return getAllModules(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить список модулей.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllModules$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllModules(params?: GetAllModules$Params, context?: HttpContext): Observable<Array<ModuleDto>> {
    return this.getAllModules$Response(params, context).pipe(
      map((r: BaseResponse<Array<ModuleDto>>): Array<ModuleDto> => r.body)
    );
  }

  /** Path part for operation `createUserModule()` */
  static readonly CreateUserModulePath = '/api/module';

  /**
   * Создать модуль.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUserModule()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUserModule$Response(params: CreateUserModule$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return createUserModule(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать модуль.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUserModule$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUserModule(params: CreateUserModule$Params, context?: HttpContext): Observable<number> {
    return this.createUserModule$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `readUserModule()` */
  static readonly ReadUserModulePath = '/api/module/{id}';

  /**
   * Получить модуль.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readUserModule()` instead.
   *
   * This method doesn't expect any request body.
   */
  readUserModule$Response(params: ReadUserModule$Params, context?: HttpContext): Observable<BaseResponse<UserModuleDto>> {
    return readUserModule(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить модуль.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readUserModule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readUserModule(params: ReadUserModule$Params, context?: HttpContext): Observable<UserModuleDto> {
    return this.readUserModule$Response(params, context).pipe(
      map((r: BaseResponse<UserModuleDto>): UserModuleDto => r.body)
    );
  }

  /** Path part for operation `updateUserModule()` */
  static readonly UpdateUserModulePath = '/api/module/{id}';

  /**
   * Изменить модуль.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserModule()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserModule$Response(params: UpdateUserModule$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateUserModule(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить модуль.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserModule$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserModule(params: UpdateUserModule$Params, context?: HttpContext): Observable<void> {
    return this.updateUserModule$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteUserModule()` */
  static readonly DeleteUserModulePath = '/api/module/{id}';

  /**
   * Удалить модуль.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUserModule()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserModule$Response(params: DeleteUserModule$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return deleteUserModule(this.http, this.rootUrl, params, context);
  }

  /**
   * Удалить модуль.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUserModule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserModule(params: DeleteUserModule$Params, context?: HttpContext): Observable<void> {
    return this.deleteUserModule$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `startUserModule()` */
  static readonly StartUserModulePath = '/api/module/{id}/start';

  /**
   * Стартовать модуль для текущего пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startUserModule()` instead.
   *
   * This method doesn't expect any request body.
   */
  startUserModule$Response(params: StartUserModule$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return startUserModule(this.http, this.rootUrl, params, context);
  }

  /**
   * Стартовать модуль для текущего пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `startUserModule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  startUserModule(params: StartUserModule$Params, context?: HttpContext): Observable<void> {
    return this.startUserModule$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `completeUserModule()` */
  static readonly CompleteUserModulePath = '/api/module/{id}/complete';

  /**
   * Завершить модуль для текущего пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeUserModule()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeUserModule$Response(params: CompleteUserModule$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return completeUserModule(this.http, this.rootUrl, params, context);
  }

  /**
   * Завершить модуль для текущего пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeUserModule$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeUserModule(params: CompleteUserModule$Params, context?: HttpContext): Observable<void> {
    return this.completeUserModule$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

}
