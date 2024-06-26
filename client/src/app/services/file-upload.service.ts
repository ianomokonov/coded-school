/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfiguration } from '@api/api-configuration';
import { BaseService } from '@api/base-service';

@Injectable({ providedIn: 'root' })
export class FileUploadService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    createTrainer(formData: FormData) {
        return this.http.post(this.rootUrl + '/api/task', formData);
    }

    updateTrainer(id: number, formData: FormData) {
        return this.http.put(this.rootUrl + '/api/task/' + id, formData);
    }

    createLesson(formData: FormData) {
        return this.http.post(this.rootUrl + '/api/lesson', formData);
    }

    updateLesson(id: number, formData: FormData) {
        return this.http.put(this.rootUrl + '/api/lesson/' + id, formData);
    }

    createComment(formData: FormData) {
        return this.http.post(this.rootUrl + '/api/comment', formData);
    }

    createNote(formData: FormData) {
        return this.http.post(this.rootUrl + '/api/note', formData);
    }

    updateNote(id: number, formData: FormData) {
        return this.http.put(this.rootUrl + '/api/note/' + id, formData);
    }
}
