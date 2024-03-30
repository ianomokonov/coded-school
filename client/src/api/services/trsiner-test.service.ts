/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { checkTest } from '../fn/trsiner-test/check-test';
import { CheckTest$Params } from '../fn/trsiner-test/check-test';
import { createTest } from '../fn/trsiner-test/create-test';
import { CreateTest$Params } from '../fn/trsiner-test/create-test';
import { getTest } from '../fn/trsiner-test/get-test';
import { GetTest$Params } from '../fn/trsiner-test/get-test';
import { getTestFull } from '../fn/trsiner-test/get-test-full';
import { GetTestFull$Params } from '../fn/trsiner-test/get-test-full';
import { TestDto } from '../models/test-dto';
import { updateTest } from '../fn/trsiner-test/update-test';
import { UpdateTest$Params } from '../fn/trsiner-test/update-test';

@Injectable({ providedIn: 'root' })
export class TrsinerTestService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getTest()` */
  static readonly GetTestPath = '/api/test/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTest()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTest$Response(params: GetTest$Params, context?: HttpContext): Observable<BaseResponse<TestDto>> {
    return getTest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTest(params: GetTest$Params, context?: HttpContext): Observable<TestDto> {
    return this.getTest$Response(params, context).pipe(
      map((r: BaseResponse<TestDto>): TestDto => r.body)
    );
  }

  /** Path part for operation `updateTest()` */
  static readonly UpdateTestPath = '/api/test/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTest$Response(params: UpdateTest$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateTest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTest(params: UpdateTest$Params, context?: HttpContext): Observable<void> {
    return this.updateTest$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getTestFull()` */
  static readonly GetTestFullPath = '/api/test/{id}/full';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTestFull()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTestFull$Response(params: GetTestFull$Params, context?: HttpContext): Observable<BaseResponse<TestDto>> {
    return getTestFull(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTestFull$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTestFull(params: GetTestFull$Params, context?: HttpContext): Observable<TestDto> {
    return this.getTestFull$Response(params, context).pipe(
      map((r: BaseResponse<TestDto>): TestDto => r.body)
    );
  }

  /** Path part for operation `checkTest()` */
  static readonly CheckTestPath = '/api/test/check';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkTest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkTest$Response(params: CheckTest$Params, context?: HttpContext): Observable<BaseResponse<boolean>> {
    return checkTest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkTest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkTest(params: CheckTest$Params, context?: HttpContext): Observable<boolean> {
    return this.checkTest$Response(params, context).pipe(
      map((r: BaseResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `createTest()` */
  static readonly CreateTestPath = '/api/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTest$Response(params: CreateTest$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return createTest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTest(params: CreateTest$Params, context?: HttpContext): Observable<number> {
    return this.createTest$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

}
