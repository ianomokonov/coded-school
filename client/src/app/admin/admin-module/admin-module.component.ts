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
import { MessageService, TreeDragDropService, TreeNode } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TreeModule, TreeNodeDropEvent } from 'primeng/tree';

@Component({
    selector: 'coded-admin-module',
    standalone: true,
    providers: [TreeDragDropService],
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
        private toastService: MessageService,
    ) {
        this.updateTree();
    }

    nodeSelect({ node }: { node: TreeNode }) {
        this.router.navigate([node.data.url], {
            queryParams: node.data.parentId ? { parentId: node.data.parentId } : {},
        });
    }

    nodeDrop(event: TreeNodeDropEvent) {
        if (event.dragNode?.parent?.children?.[0]?.data.type === 'trainer') {
            this.toastService.add({
                severity: 'error',
                summary: 'Ошибка сортировки',
                detail: 'Тренажер не может быть на первом месте в теме',
            });
            return;
        }

        const index = event.dragNode?.parent?.children?.findIndex(
            (c) =>
                c.data.id === event.dragNode?.data.id && c.data.type === event.dragNode?.data.type,
        );
        const prevNode = index ? event.dragNode?.parent?.children?.[index - 1] : null;

        this.topicService
            .moveChild({
                body: {
                    child: { id: event.dragNode?.data.id, type: event.dragNode?.data.type },
                    prevChild: prevNode
                        ? { id: prevNode.data.id, type: prevNode.data.type }
                        : undefined,
                    topicId: event.dragNode?.data.parentId,
                },
            })
            .subscribe(() => {});
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

    private getTree(
        module: ModuleTreeDto | TopicTreeDto | TopicChildDto,
        parentId?: number,
    ): TreeNode {
        if ('topics' in module) {
            return {
                label: module.name,
                data: { url: `/admin/module/${module.id}`, type: 'module', id: module.id },
                icon: 'pi pi-server',
                children: [
                    ...(module.topics?.map((t) => this.getTree(t, module.id)) || []),
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
                data: { url: `/admin/topic/${module.id}`, type: 'topic', id: module.id, parentId },
                children: [
                    ...(module.children?.map((t) => this.getTree(t, module.id)) || []),
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
            data: {
                url: `/admin/${module.type}/${module.id}`,
                type: module.type,
                id: module.id,
                parentId,
            },
            icon: 'pi pi-file',
        };
    }
}
