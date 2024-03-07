import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TopicDto } from '@api/index';
import { TopicService } from '@api/services';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'coded-topic',
    standalone: true,
    imports: [ProgressBarModule, CardModule, RouterModule, CommonModule, AvatarModule],
    templateUrl: './topic.component.html',
})
export class TopicComponent implements OnInit {
    topic: TopicDto | undefined;

    constructor(
        private topicService: TopicService,
        private activeRoute: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            this.topicService.readTopic({ id }).subscribe((m) => {
                this.topic = m;
            });
        });
    }
}
