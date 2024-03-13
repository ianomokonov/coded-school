/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { FilesTreeDto } from '../models/files-tree-dto';
import { getEditorCode } from '../fn/editor/get-editor-code';
import { GetEditorCode$Params } from '../fn/editor/get-editor-code';
import { getFiles } from '../fn/editor/get-files';
import { GetFiles$Params } from '../fn/editor/get-files';
import { runEditor } from '../fn/editor/run-editor';
import { RunEditor$Params } from '../fn/editor/run-editor';

@Injectable({ providedIn: 'root' })
export class EditorService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getFiles()` */
  static readonly GetFilesPath = '/api/editor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFiles$Response(params: GetFiles$Params, context?: HttpContext): Observable<BaseResponse<Array<FilesTreeDto>>> {
    return getFiles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFiles(params: GetFiles$Params, context?: HttpContext): Observable<Array<FilesTreeDto>> {
    return this.getFiles$Response(params, context).pipe(
      map((r: BaseResponse<Array<FilesTreeDto>>): Array<FilesTreeDto> => r.body)
    );
  }

  /** Path part for operation `runEditor()` */
  static readonly RunEditorPath = '/api/editor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `runEditor()` instead.
   *
   * This method doesn't expect any request body.
   */
  runEditor$Response(params?: RunEditor$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return runEditor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `runEditor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  runEditor(params?: RunEditor$Params, context?: HttpContext): Observable<void> {
    return this.runEditor$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getEditorCode()` */
  static readonly GetEditorCodePath = '/api/editor/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEditorCode()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEditorCode$Response(params: GetEditorCode$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return getEditorCode(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEditorCode$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEditorCode(params: GetEditorCode$Params, context?: HttpContext): Observable<void> {
    return this.getEditorCode$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

}
