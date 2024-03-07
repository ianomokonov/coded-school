import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonDto } from '@api/index';
import { LessonService } from '@api/services';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'coded-lesson',
    standalone: true,
    imports: [ButtonModule, CardModule, RouterModule, AvatarModule],
    templateUrl: './lesson.component.html',
})
export class LessonComponent implements OnInit {
    lesson: LessonDto | undefined;

    constructor(
        private lessonService: LessonService,
        private activeRoute: ActivatedRoute,
        private router: Router,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            this.lessonService.readLesson({ id }).subscribe((m) => {
                this.lesson = m;
            });
        });
    }

    completeLesson(): void {
        if (!this.lesson) {
            return;
        }
        this.lessonService.completeLesson({ id: this.lesson?.id }).subscribe(() => {
            if (this.lesson?.nextLessonId) {
                this.router.navigate(['/lesson', this.lesson.nextLessonId]);
                return;
            }
            this.router.navigate(['/module', this.lesson?.moduleId]);
        });
    }
}
