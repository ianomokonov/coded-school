import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorModule } from 'primeng/editor';

@Component({
    selector: 'coded-create-comment',
    standalone: true,
    imports: [EditorModule, ReactiveFormsModule, ButtonModule, CardModule],
    templateUrl: './create-comment.component.html',
})
export class CreateCommentComponent {
    @Input() lessonId!: number;
    @Output() onSaveComment: EventEmitter<string> = new EventEmitter<string>();
    textControl: FormControl = new FormControl(null, [Validators.required]);

    constructor() {}

    save() {
        if (this.textControl.invalid) {
            this.textControl.markAsDirty();
            return;
        }

        this.onSaveComment.emit(this.textControl.value);
    }
}
