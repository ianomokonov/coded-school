import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TopicDto } from '@api/index';
import { TopicService } from '@api/services';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'coded-topic',
    standalone: true,
    providers: [DestroyService],
    imports: [ProgressBarModule, CardModule, RouterModule, CommonModule, AvatarModule],
    templateUrl: './topic.component.html',
})
export class TopicComponent implements OnInit {
    topic: TopicDto | undefined;

    constructor(
        private topicService: TopicService,
        private activeRoute: ActivatedRoute,
        private destroy$: DestroyService,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
            this.topicService
                .readTopic({ id })
                .pipe(takeUntil(this.destroy$))
                .subscribe((m) => {
                    this.topic = m;
                });
        });
    }

    getCompletedCount(): number {
        if (!this.topic || !this.topic.lessons.length) {
            return 0;
        }
        return this.topic.lessons.filter((l) => l.isCompleted).length;
    }
}
