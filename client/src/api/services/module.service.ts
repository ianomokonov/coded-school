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
import { create } from '../fn/module/create';
import { Create$Params } from '../fn/module/create';
import { delete$ } from '../fn/module/delete';
import { Delete$Params } from '../fn/module/delete';
import { getAllModules } from '../fn/module/get-all-modules';
import { GetAllModules$Params } from '../fn/module/get-all-modules';
import { ModuleDto } from '../models/module-dto';
import { read } from '../fn/module/read';
import { Read$Params } from '../fn/module/read';
import { update } from '../fn/module/update';
import { Update$Params } from '../fn/module/update';

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

  /** Path part for operation `create()` */
  static readonly CreatePath = '/api/module';

  /**
   * Создать модуль.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params: Create$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return create(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать модуль.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params: Create$Params, context?: HttpContext): Observable<number> {
    return this.create$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `read()` */
  static readonly ReadPath = '/api/module/{id}';

  /**
   * Получить модуль.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `read()` instead.
   *
   * This method doesn't expect any request body.
   */
  read$Response(params: Read$Params, context?: HttpContext): Observable<BaseResponse<ModuleDto>> {
    return read(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить модуль.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `read$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  read(params: Read$Params, context?: HttpContext): Observable<ModuleDto> {
    return this.read$Response(params, context).pipe(
      map((r: BaseResponse<ModuleDto>): ModuleDto => r.body)
    );
  }

  /** Path part for operation `update()` */
  static readonly UpdatePath = '/api/module/{id}';

  /**
   * Изменить модуль.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update$Response(params: Update$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return update(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить модуль.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update(params: Update$Params, context?: HttpContext): Observable<void> {
    return this.update$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `delete()` */
  static readonly DeletePath = '/api/module/{id}';

  /**
   * Удалить модуль.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: Delete$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return delete$(this.http, this.rootUrl, params, context);
  }

  /**
   * Удалить модуль.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: Delete$Params, context?: HttpContext): Observable<void> {
    return this.delete$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `completeUserModule()` */
  static readonly CompleteUserModulePath = '/api/module/{id}/start';

  /**
   * Стартовать модуль для текущего пользователя.
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
   * Стартовать модуль для текущего пользователя.
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
