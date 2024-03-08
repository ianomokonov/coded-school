import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
    LessonDto,
    LessonService,
    ModuleDto,
    ModuleService,
    TopicDto,
    TopicService,
} from '@api/index';
import { TreeNode } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TreeModule } from 'primeng/tree';

@Component({
    selector: 'coded-admin-module',
    standalone: true,
    imports: [TreeModule, MenuModule, RouterModule],
    templateUrl: './admin-module.component.html',
})
export class AdminModuleComponent {
    modules: TreeNode[] | undefined;

    constructor(
        private modulesService: ModuleService,
        private lessonsService: LessonService,
        private topicService: TopicService,
        private router: Router,
    ) {
        this.updateTree();
    }

    nodeSelect({ node }: { node: TreeNode }) {
        this.router.navigate([node.data.url]);
    }

    deleteItem(event: MouseEvent, item: TreeNode) {
        event.preventDefault();
        event.stopPropagation();
        switch (item.data.type) {
            case 'module': {
                this.modulesService
                    .deleteUserModule({ id: item.data.id })
                    .subscribe(() => this.updateTree());
                return;
            }
            case 'topic': {
                this.topicService
                    .deleteTopic({ id: item.data.id })
                    .subscribe(() => this.updateTree());
                return;
            }
            case 'lesson': {
                this.lessonsService
                    .deleteLesson({ id: item.data.id })
                    .subscribe(() => this.updateTree());
                return;
            }
            default: {
                return;
            }
        }
    }

    private updateTree() {
        this.modulesService.getModulesTree().subscribe((modules) => {
            this.modules = [
                ...modules.map((m) => this.getTree(m)),
                {
                    label: 'Создать модуль',
                    data: { url: `/admin/module/create`, type: 'create' },
                    icon: 'pi pi-plus',
                },
            ];
        });
    }

    private getTree(module: ModuleDto | TopicDto | LessonDto): TreeNode {
        if ('topics' in module) {
            return {
                label: module.name,
                data: { url: `/admin/module/${module.id}`, type: 'module', id: module.id },
                icon: 'pi pi-server',
                children: [
                    ...(module.topics?.map((t) => this.getTree(t)) || []),
                    {
                        label: 'Создать тему',
                        data: { url: `/admin/topic/create`, type: 'create' },
                        icon: 'pi pi-plus',
                    },
                ],
            };
        }
        if ('lessons' in module) {
            return {
                label: module.name,
                icon: `pi pi-sitemap`,
                data: { url: `/admin/topic/${module.id}`, type: 'topic', id: module.id },
                children: [
                    ...(module.lessons?.map((t) => this.getTree(t)) || []),
                    {
                        label: 'Создать урок',
                        data: { url: `/admin/lesson/create`, type: 'create' },
                        icon: 'pi pi-plus',
                    },
                ],
            };
        }

        return {
            label: module.name,
            data: { url: `/admin/lesson/${module.id}`, type: 'lesson', id: module.id },
            icon: 'pi pi-file',
        };
    }
}
