import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'coded-create-comment',
    standalone: true,
    imports: [EditorModule, ReactiveFormsModule, ButtonModule, CardModule],
    templateUrl: './create-comment.component.html',
    styleUrl: './create-comment.component.scss',
})
export class CreateCommentComponent {
    @Input() lessonId!: number;
    @Input() quote?: SafeHtml;
    @Output() onSaveComment: EventEmitter<string> = new EventEmitter<string>();
    textControl: FormControl = new FormControl(null, [Validators.required]);

    constructor() {}

    save() {
        if (this.textControl.invalid) {
            this.textControl.markAsDirty();
            return;
        }

        this.onSaveComment.emit(this.textControl.value);

        this.textControl.setValue(null);
    }
}
