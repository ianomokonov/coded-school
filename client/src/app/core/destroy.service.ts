import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: null })
export class DestroyService extends Subject<void> implements OnDestroy {
    ngOnDestroy(): void {
        this.next();
        this.complete();
    }
}
