import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentService } from '@api/services';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { Comment } from './models/comment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'coded-comments',
    standalone: true,
    imports: [ButtonModule, CardModule, RouterModule, AvatarModule, CreateCommentComponent],
    templateUrl: './comments.component.html',
    styles: `
        svg {
            height: 1rem;
            width: 1rem;
        }
    `,
})
export class CommentsComponent implements OnInit {
    @Input() lessonId!: number;
    @Input() set quote(quote: string | undefined) {
        this.quoteHtml = quote && this.dom.bypassSecurityTrustHtml(quote);
        this.quoteString = quote;
    }

    quoteHtml?: SafeHtml;
    quoteString?: string;
    comments: Comment[] | undefined;

    constructor(
        private commentService: CommentService,
        private dom: DomSanitizer,
    ) {}
    ngOnInit(): void {
        this.getComments();
    }

    getComments() {
        this.commentService.readLessonComments({ id: this.lessonId }).subscribe((comments) => {
            this.comments = comments.map((c) => ({
                ...c,
                quoteHtml: c.quote && this.dom.bypassSecurityTrustHtml(c.quote),
            }));
        });
    }

    createComment(text: string, relativeCommentId?: number) {
        this.commentService
            .createComment({
                body: {
                    lessonId: this.lessonId,
                    text,
                    relativeCommentId,
                    quote: this.quoteString,
                },
            })
            .subscribe(() => {
                this.getComments();
            });
    }

    onAnswer(comment: Comment) {
        comment.isEditing = !comment.isEditing;
    }
}
