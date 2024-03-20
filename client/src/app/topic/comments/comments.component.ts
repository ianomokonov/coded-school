import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentService } from '@api/services';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { Comment } from './models/comment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditorHelper } from '@app/utils/editor-helper';
import { FileUploadService } from '@app/services/file-upload.service';

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
        private fileUploadService: FileUploadService,
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
        const [, newFiles, newContent] = EditorHelper.getFilesDelta(
            text,
            (index, ext) => `${index}.${ext}`,
        );

        const formData = new FormData();
        formData.append('text', newContent);
        formData.append('lessonId', this.lessonId.toString());
        if (relativeCommentId) {
            formData.append('relativeCommentId', relativeCommentId.toString());
        }
        if (this.quoteString) {
            formData.append('quote', this.quoteString);
        }

        newFiles?.forEach((f) => {
            formData.append('files', f);
        });

        this.fileUploadService.createComment(formData).subscribe(() => {
            this.getComments();
        });
    }

    onAnswer(comment: Comment) {
        comment.isEditing = !comment.isEditing;
    }
}
