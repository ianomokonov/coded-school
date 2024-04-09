import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AdminModuleService {
    public treeUpdated$: Subject<void> = new Subject();
}
