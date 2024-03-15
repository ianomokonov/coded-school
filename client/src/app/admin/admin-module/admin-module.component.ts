import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
    LessonService,
    ModuleService,
    ModuleTreeDto,
    TopicChildDto,
    TopicService,
    TopicTreeDto,
    TrainerService,
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
        private trainerService: TrainerService,
        private router: Router,
    ) {
        this.updateTree();
    }

    nodeSelect({ node }: { node: TreeNode }) {
        this.router.navigate([node.data.url], {
            queryParams: node.data.parentId ? { parentId: node.data.parentId } : {},
        });
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
            case 'trainer': {
                this.trainerService
                    .deleteTrainer({ id: item.data.id })
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

    private getTree(module: ModuleTreeDto | TopicTreeDto | TopicChildDto): TreeNode {
        if ('topics' in module) {
            return {
                label: module.name,
                data: { url: `/admin/module/${module.id}`, type: 'module', id: module.id },
                icon: 'pi pi-server',
                children: [
                    ...(module.topics?.map((t) => this.getTree(t)) || []),
                    {
                        label: 'Создать тему',
                        data: { url: `/admin/topic/create`, type: 'create', parentId: module.id },
                        icon: 'pi pi-plus',
                    },
                ],
            };
        }
        if ('children' in module) {
            return {
                label: module.name,
                icon: `pi pi-sitemap`,
                data: { url: `/admin/topic/${module.id}`, type: 'topic', id: module.id },
                children: [
                    ...(module.children?.map((t) => this.getTree(t)) || []),
                    {
                        label: 'Создать урок',
                        data: { url: `/admin/lesson/create`, type: 'create', parentId: module.id },
                        icon: 'pi pi-plus',
                    },
                    {
                        label: 'Создать тренажер',
                        data: { url: `/admin/trainer/create`, type: 'create', parentId: module.id },
                        icon: 'pi pi-plus',
                    },
                ],
            };
        }

        return {
            label: module.name,
            data: { url: `/admin/${module.type}/${module.id}`, type: module.type, id: module.id },
            icon: 'pi pi-file',
        };
    }
}
