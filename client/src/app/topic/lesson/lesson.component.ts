import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LessonDto } from '@api/index';
import { LessonService } from '@api/services';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'coded-lesson',
    standalone: true,
    imports: [ProgressBarModule, CardModule, RouterModule, CommonModule, AvatarModule],
    templateUrl: './lesson.component.html',
})
export class LessonComponent implements OnInit {
    lesson: LessonDto | undefined;

    constructor(
        private lessonService: LessonService,
        private activeRoute: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            this.lessonService.readLesson({ id }).subscribe((m) => {
                this.lesson = m;
            });
        });
    }
}
