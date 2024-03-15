/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfiguration } from '@api/api-configuration';
import { BaseService } from '@api/base-service';

@Injectable({ providedIn: 'root' })
export class WithFileUploadService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    createTrainer(formData: FormData) {
        // const rb = new RequestBuilder(this.rootUrl, '/api/trainer', 'post');
        // rb.body(formData, 'multipart/form-data');

        return this.http.post(this.rootUrl + '/api/trainer', formData);
    }
}
