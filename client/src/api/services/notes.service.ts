/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { createNote } from '../fn/notes/create-note';
import { CreateNote$Params } from '../fn/notes/create-note';
import { deleteNote } from '../fn/notes/delete-note';
import { DeleteNote$Params } from '../fn/notes/delete-note';
import { getAllNotes } from '../fn/notes/get-all-notes';
import { GetAllNotes$Params } from '../fn/notes/get-all-notes';
import { NoteDto } from '../models/note-dto';
import { readNote } from '../fn/notes/read-note';
import { ReadNote$Params } from '../fn/notes/read-note';
import { updateNote } from '../fn/notes/update-note';
import { UpdateNote$Params } from '../fn/notes/update-note';

@Injectable({ providedIn: 'root' })
export class NotesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllNotes()` */
  static readonly GetAllNotesPath = '/api/note/all';

  /**
   * Получить список заметок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllNotes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllNotes$Response(params?: GetAllNotes$Params, context?: HttpContext): Observable<BaseResponse<Array<NoteDto>>> {
    return getAllNotes(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить список заметок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllNotes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllNotes(params?: GetAllNotes$Params, context?: HttpContext): Observable<Array<NoteDto>> {
    return this.getAllNotes$Response(params, context).pipe(
      map((r: BaseResponse<Array<NoteDto>>): Array<NoteDto> => r.body)
    );
  }

  /** Path part for operation `createNote()` */
  static readonly CreateNotePath = '/api/note';

  /**
   * Создать заметку.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNote()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNote$Response(params: CreateNote$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return createNote(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать заметку.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createNote$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNote(params: CreateNote$Params, context?: HttpContext): Observable<number> {
    return this.createNote$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `readNote()` */
  static readonly ReadNotePath = '/api/note/{id}';

  /**
   * Получить заметку.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readNote()` instead.
   *
   * This method doesn't expect any request body.
   */
  readNote$Response(params: ReadNote$Params, context?: HttpContext): Observable<BaseResponse<NoteDto>> {
    return readNote(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить заметку.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readNote$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readNote(params: ReadNote$Params, context?: HttpContext): Observable<NoteDto> {
    return this.readNote$Response(params, context).pipe(
      map((r: BaseResponse<NoteDto>): NoteDto => r.body)
    );
  }

  /** Path part for operation `updateNote()` */
  static readonly UpdateNotePath = '/api/note/{id}';

  /**
   * Изменить заметку.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateNote()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateNote$Response(params: UpdateNote$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateNote(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить заметку.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateNote$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateNote(params: UpdateNote$Params, context?: HttpContext): Observable<void> {
    return this.updateNote$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteNote()` */
  static readonly DeleteNotePath = '/api/note/{id}';

  /**
   * Удалить заметку.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteNote()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteNote$Response(params: DeleteNote$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return deleteNote(this.http, this.rootUrl, params, context);
  }

  /**
   * Удалить заметку.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteNote$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteNote(params: DeleteNote$Params, context?: HttpContext): Observable<void> {
    return this.deleteNote$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

}
