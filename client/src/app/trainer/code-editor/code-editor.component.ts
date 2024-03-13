import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { DropdownModule } from 'primeng/dropdown';
import { LabelValue } from '@shared/models/label.model';
import { EditorThemes } from './themes.enum';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { fileFormat } from './file-formatter';
import { TrainerService } from '@api/services';

@Component({
    selector: 'coded-editor',
    standalone: true,
    imports: [CodeEditorModule, DropdownModule, FormsModule, CardModule, TreeModule],
    templateUrl: './code-editor.component.html',
    providers: [DestroyService],
})
export class CodedEditorComponent implements OnInit {
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
            enabled: true,
        },
    };

    files: TreeNode[] = [];

    trainerDir = 'test-trainer';

    constructor(
        private trainerService: TrainerService,
        private cdr: ChangeDetectorRef,
        private destroy$: DestroyService,
    ) {}

    ngOnInit(): void {
        this.trainerService
            .getFiles({ dir: this.trainerDir })
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                res.map((el) => this.files.push(el));
            });
    }

    getFiles(node: TreeNode): void {
        if (!node.children?.length) {
            this.trainerService
                .getFiles({ dir: node.label! })
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                    node.children = res;
                    node.expanded = true;
                    this.cdr.detectChanges();
                });
        } else {
            node.expanded = !node.expanded;
        }
    }

    getCode(fileName: string): void {
        this.trainerService
            .getEditorCode({ name: fileName })
            .pipe(takeUntil(this.destroy$))
            .subscribe((code) => {
                this.model = {
                    uri: fileName,
                    language: fileFormat(fileName),
                    value: code as unknown as string,
                };
            });
    }

    onCodeChanged(value: string) {}

    isDir(fileName: string): boolean {
        const fileNameArr = fileName.split('.');
        return !(fileNameArr.length > 1);
    }
}
