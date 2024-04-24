import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { CodedEditorComponent } from './code-editor/code-editor.component';
import { TaskDto, TrainerTaskService } from '@api/index';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { NgClass } from '@angular/common';

@Component({
    selector: 'coded-trainer',
    standalone: true,
    templateUrl: './trainer.component.html',
    imports: [CodedEditorComponent, ButtonModule, RouterModule, MessagesModule, NgClass],
    providers: [DestroyService],
    styleUrl: './trainer.component.scss',
})
export class TrainerComponent implements OnInit {
    trainer: (TaskDto & { isChecked?: boolean }) | undefined;
    static = { html: '', css: '' };
    errorMessages: Message[] = [];
    isChecking = false;
    constructor(
        private renderer: Renderer2,
        private taskService: TrainerTaskService,
        private cdr: ChangeDetectorRef,
        private destroy$: DestroyService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
            this.taskService
                .getTrainer({ id })
                .pipe(takeUntil(this.destroy$))
                .subscribe((m) => {
                    this.trainer = m;
                });
        });
    }

    onCodeChanged(value: { html: string; css: string }) {
        this.static.html = value.html;
        this.static.css = value.css;
        const iframe = this.renderer.createElement('iframe');
        iframe.classList.add('iframe');
        const styleWrapper = this.renderer.createElement('div');
        styleWrapper.innerHTML = `<style>${value.css}</style>`;
        document.querySelector('iframe')?.replaceWith(iframe);
        const iframeDoc = iframe.contentDocument;
        if (!iframeDoc) {
            return;
        }
        iframeDoc.write(value.html);
        iframeDoc.head.append(styleWrapper);
        iframeDoc.close();
    }

    onCheck() {
        if (!this.trainer) {
            return;
        }

        if (!this.static.html) {
            return;
        }

        this.isChecking = true;
        let html = this.static.html;

        if (this.static.css) {
            html = html.replace('<head>', `<head><style>${this.static.css}</style>`);
        }

        this.taskService
            .checkTrainer({ id: this.trainer?.id, body: { html } })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result) => {
                    if (!this.trainer) {
                        return;
                    }
                    this.trainer.isChecked = result.isCorrect;
                    this.errorMessages =
                        result.messages?.map((m) => ({ severity: 'error', detail: m })) || [];
                    this.isChecking = false;
                },
                error: () => {
                    this.isChecking = false;
                },
            });
    }
}
