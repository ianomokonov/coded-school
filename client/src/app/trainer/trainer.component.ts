import { Component, Renderer2 } from '@angular/core';
import { CodedEditorComponent } from './code-editor/code-editor.component';

@Component({
    selector: 'coded-trainer',
    standalone: true,
    templateUrl: './trainer.component.html',
    imports: [CodedEditorComponent],
    styleUrl: './trainer.component.scss',
})
export class TrainerComponent {
    constructor(private renderer: Renderer2) {}

    onCodeChanged(value: { html: string; css: string }) {
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
}
