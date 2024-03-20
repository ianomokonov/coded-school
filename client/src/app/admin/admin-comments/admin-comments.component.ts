import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CreateCommentComponent } from '../../topic/comments/create-comment/create-comment.component';
import { CommentService } from '@api/services';
import { Comment } from '@app/topic/comments/models/comment';

@Component({
    selector: 'coded-admin-comments',
    standalone: true,
    imports: [ButtonModule, CardModule, RouterModule, AvatarModule, CreateCommentComponent],
    templateUrl: './admin-comments.component.html',
})
export class AdminCommentsComponent implements OnInit {
    comments: Comment[] = [];
    skip: number = 0;
    constructor(private commentService: CommentService) {}

    ngOnInit(): void {
        this.getComments();
    }

    getComments() {
        this.commentService.readAllComments({ take: 3, skip: this.skip }).subscribe((comments) => {
            this.comments.push(...comments);
            this.skip = this.comments.length;
        });
    }

    createComment(text: string, relativeComment: Comment) {
        this.commentService
            .createComment({
                body: {
                    lessonId: relativeComment.lessonId,
                    text,
                    relativeCommentId: relativeComment.id,
                },
            })
            .subscribe((comment) => {
                this.comments.unshift(comment);
                relativeComment.isEditing = false;
                this.skip += 1;
            });
    }

    onAnswer(comment: Comment) {
        comment.isEditing = !comment.isEditing;
    }
}
