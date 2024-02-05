/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { AchievementDto } from '../models/achievement-dto';
import { createAchievement } from '../fn/achievement/create-achievement';
import { CreateAchievement$Params } from '../fn/achievement/create-achievement';
import { deleteAchievement } from '../fn/achievement/delete-achievement';
import { DeleteAchievement$Params } from '../fn/achievement/delete-achievement';
import { getAllAchievements } from '../fn/achievement/get-all-achievements';
import { GetAllAchievements$Params } from '../fn/achievement/get-all-achievements';
import { readAchievement } from '../fn/achievement/read-achievement';
import { ReadAchievement$Params } from '../fn/achievement/read-achievement';
import { setUserAchievement } from '../fn/achievement/set-user-achievement';
import { SetUserAchievement$Params } from '../fn/achievement/set-user-achievement';
import { updateAchievement } from '../fn/achievement/update-achievement';
import { UpdateAchievement$Params } from '../fn/achievement/update-achievement';

@Injectable({ providedIn: 'root' })
export class AchievementService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllAchievements()` */
  static readonly GetAllAchievementsPath = '/api/achievement/all';

  /**
   * Получить список всех достижений.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAchievements()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAchievements$Response(params?: GetAllAchievements$Params, context?: HttpContext): Observable<BaseResponse<Array<AchievementDto>>> {
    return getAllAchievements(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить список всех достижений.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAchievements$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAchievements(params?: GetAllAchievements$Params, context?: HttpContext): Observable<Array<AchievementDto>> {
    return this.getAllAchievements$Response(params, context).pipe(
      map((r: BaseResponse<Array<AchievementDto>>): Array<AchievementDto> => r.body)
    );
  }

  /** Path part for operation `createAchievement()` */
  static readonly CreateAchievementPath = '/api/achievement';

  /**
   * Создать достижение.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAchievement()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAchievement$Response(params: CreateAchievement$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return createAchievement(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать достижение.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createAchievement$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAchievement(params: CreateAchievement$Params, context?: HttpContext): Observable<number> {
    return this.createAchievement$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `readAchievement()` */
  static readonly ReadAchievementPath = '/api/achievement/{id}';

  /**
   * Получить достижение.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readAchievement()` instead.
   *
   * This method doesn't expect any request body.
   */
  readAchievement$Response(params: ReadAchievement$Params, context?: HttpContext): Observable<BaseResponse<AchievementDto>> {
    return readAchievement(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить достижение.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readAchievement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readAchievement(params: ReadAchievement$Params, context?: HttpContext): Observable<AchievementDto> {
    return this.readAchievement$Response(params, context).pipe(
      map((r: BaseResponse<AchievementDto>): AchievementDto => r.body)
    );
  }

  /** Path part for operation `updateAchievement()` */
  static readonly UpdateAchievementPath = '/api/achievement/{id}';

  /**
   * Изменить достижение.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAchievement()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAchievement$Response(params: UpdateAchievement$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateAchievement(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить достижение.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAchievement$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAchievement(params: UpdateAchievement$Params, context?: HttpContext): Observable<void> {
    return this.updateAchievement$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteAchievement()` */
  static readonly DeleteAchievementPath = '/api/achievement/{id}';

  /**
   * Удалить достижение.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAchievement()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAchievement$Response(params: DeleteAchievement$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return deleteAchievement(this.http, this.rootUrl, params, context);
  }

  /**
   * Удалить достижение.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteAchievement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAchievement(params: DeleteAchievement$Params, context?: HttpContext): Observable<void> {
    return this.deleteAchievement$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `setUserAchievement()` */
  static readonly SetUserAchievementPath = '/api/achievement/{id}/set';

  /**
   * Добавить достижение пользователю.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setUserAchievement()` instead.
   *
   * This method doesn't expect any request body.
   */
  setUserAchievement$Response(params: SetUserAchievement$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return setUserAchievement(this.http, this.rootUrl, params, context);
  }

  /**
   * Добавить достижение пользователю.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setUserAchievement$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setUserAchievement(params: SetUserAchievement$Params, context?: HttpContext): Observable<void> {
    return this.setUserAchievement$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

}
