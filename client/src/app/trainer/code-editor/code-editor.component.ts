import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { DropdownModule } from 'primeng/dropdown';
import { LabelValue } from '@shared/models/label.model';
import { EditorThemes } from './themes.enum';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DestroyService } from '@core/destroy.service';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { fileFormat } from './file-formatter';
import { FileDto, TrainerDto } from '@api/index';

@Component({
    selector: 'coded-editor',
    standalone: true,
    imports: [CodeEditorModule, DropdownModule, FormsModule, CardModule, TreeModule],
    templateUrl: './code-editor.component.html',
    providers: [DestroyService],
})
export class CodedEditorComponent implements OnChanges {
    loading: boolean = false;
    readonly themeValues: LabelValue[] = [
        {
            label: 'Vs',
            value: EditorThemes.VS,
        },
        {
            label: 'VS Dark',
            value: EditorThemes.VS_DARK,
        },
        {
            label: 'HC Black',
            value: EditorThemes.HC_BLACK,
        },
    ];
    theme = EditorThemes.VS_DARK;

    model: CodeModel = {
        language: '',
        uri: '',
        value: '{}',
    };

    options = {
        contextmenu: true,
        minimap: {
            enabled: false,
        },
    };

    @Input() trainer!: TrainerDto;
    files: TreeNode[] = [];
    selectedFile: FileDto | undefined;

    @Output() onCode: EventEmitter<{ html: string; css: string }> = new EventEmitter();

    constructor() {}
    ngOnChanges(changes: SimpleChanges): void {
        if (!changes['trainer']) {
            return;
        }
        this.trainer.files?.map((el) => {
            this.files.push({ label: el.label, data: el });
        });
        if (!this.files.length) {
            return;
        }
        this.selectFile(this.files[0]);
        if (!this.selectedFile) {
            return;
        }
        this.onCodeChanged(this.selectedFile?.content);
    }

    selectFile(node: TreeNode): void {
        this.selectedFile = this.trainer?.files?.find((f) => f.label === node.data.label);
        this.model = {
            uri: node.data.label,
            language: fileFormat(node.data.label),
            value: node.data.content,
        };
    }

    onCodeChanged(value: string) {
        if (!this.selectedFile) {
            return;
        }
        this.selectedFile.content = value;

        this.onCode.emit({
            html: this.trainer?.files?.find((f) => f.label.includes('html'))?.content || '',
            css: this.trainer?.files?.find((f) => f.label.includes('css'))?.content || '',
        });
    }
}
