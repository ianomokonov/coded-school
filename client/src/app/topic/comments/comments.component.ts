import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentDto } from '@api/index';
import { CommentService } from '@api/services';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CreateCommentComponent } from './create-comment/create-comment.component';

@Component({
    selector: 'coded-comments',
    standalone: true,
    imports: [ButtonModule, CardModule, RouterModule, AvatarModule, CreateCommentComponent],
    templateUrl: './comments.component.html',
})
export class CommentsComponent implements OnInit {
    @Input() lessonId!: number;
    comments: CommentDto[] | undefined;

    constructor(private commentService: CommentService) {}
    ngOnInit(): void {
        this.commentService.readLessonComments({ id: this.lessonId }).subscribe((comments) => {
            this.comments = comments;
        });
    }

    createComment(text: string) {
        this.commentService
            .createComment({
                body: { lessonId: this.lessonId, text },
            })
            .subscribe(() => {
                this.commentService
                    .readLessonComments({ id: this.lessonId })
                    .subscribe((comments) => {
                        this.comments = comments;
                    });
            });
    }
}
