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
import { DestroyService } from '@core/destroy.service';
import { MessageService, TreeDragDropService, TreeNode } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TreeModule, TreeNodeDropEvent } from 'primeng/tree';
import { takeUntil } from 'rxjs';
import { AdminModuleService } from './admin-module.service';

@Component({
    selector: 'coded-admin-module',
    standalone: true,
    providers: [TreeDragDropService, DestroyService, AdminModuleService],
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
        private destroy$: DestroyService,
        private adminModuleService: AdminModuleService,
    ) {
        this.adminModuleService.treeUpdated$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.updateTree();
        });
        this.updateTree();
    }

    nodeSelect({ node }: { node: TreeNode }) {
        this.router.navigate([node.data.url], {
            queryParams: node.data.parentId ? { parentId: node.data.parentId } : {},
        });
    }

    nodeDrop(event: TreeNodeDropEvent) {
        if (
            !(event.originalEvent?.target as HTMLElement).classList.contains('p-treenode-droppoint')
        ) {
            return;
        }
        if (!event.dropNode?.droppable && !event.dropNode?.data?.droppable) {
            return;
        }
        if (!event.index && event.dragNode?.data.type === 'trainer') {
            this.toastService.add({
                severity: 'error',
                summary: 'Ошибка сортировки',
                detail: 'Тренажер не может быть на первом месте в теме',
            });
            return;
        }

        event.accept?.();

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
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {});
    }

    deleteItem(event: MouseEvent, item: TreeNode) {
        event.preventDefault();
        event.stopPropagation();
        switch (item.data.type) {
            case 'module': {
                this.modulesService
                    .deleteUserModule({ id: item.data.id })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => this.updateTree());
                return;
            }
            case 'topic': {
                this.topicService
                    .deleteTopic({ id: item.data.id })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => this.updateTree());
                return;
            }
            case 'lesson': {
                this.lessonsService
                    .deleteLesson({ id: item.data.id })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => this.updateTree());
                return;
            }
            case 'test':
            case 'trainer': {
                this.trainerService
                    .deleteTrainer({ id: item.data.id })
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => this.updateTree());
                return;
            }
            default: {
                return;
            }
        }
    }

    private updateTree() {
        this.modulesService
            .getModulesTree()
            .pipe(takeUntil(this.destroy$))
            .subscribe((dto) => {
                this.modules = [
                    ...dto.modules.map((m) => this.getTree(m, undefined, this.modules)),
                    {
                        label: 'Создать модуль',
                        draggable: false,
                        droppable: false,
                        data: { url: `/admin/module/create`, type: 'create' },
                        styleClass: 'border-bottom-1 border-200',
                        icon: 'pi pi-plus',
                    },
                    ...dto.trainers.map((t) => this.getTree(t)),
                    {
                        label: 'Создать тренажер',
                        data: { url: `/admin/trainer/create`, type: 'create' },
                        icon: 'pi pi-plus',

                        draggable: false,
                        droppable: false,
                    },
                ];
            });
    }

    private getTree(
        module: ModuleTreeDto | TopicTreeDto | TopicChildDto,
        parentId?: number,
        brotherNodes?: TreeNode[],
    ): TreeNode {
        const curNode = brotherNodes?.find((m) => m.data.id === module.id);
        if ('topics' in module) {
            return {
                label: module.name,
                draggable: false,
                droppable: false,
                data: { url: `/admin/module/${module.id}`, type: 'module', id: module.id },
                icon: 'pi pi-server',
                expanded: curNode?.expanded,
                children: [
                    ...(module.topics?.map((t) => this.getTree(t, module.id, curNode?.children)) ||
                        []),
                    {
                        label: 'Создать тему',
                        data: { url: `/admin/topic/create`, type: 'create', parentId: module.id },
                        icon: 'pi pi-plus',
                        draggable: false,
                        droppable: false,
                    },
                ],
            };
        }
        if ('children' in module) {
            return {
                label: module.name,
                icon: `pi pi-sitemap`,
                draggable: false,
                droppable: false,
                data: { url: `/admin/topic/${module.id}`, type: 'topic', id: module.id, parentId },
                expanded: curNode?.expanded,
                children: [
                    ...(module.children?.map((t) =>
                        this.getTree(t, module.id, curNode?.children),
                    ) || []),
                    {
                        label: 'Создать урок',
                        data: {
                            url: `/admin/lesson/create`,
                            type: 'create',
                            parentId: module.id,
                            droppable: true,
                        },
                        icon: 'pi pi-plus',
                        draggable: false,
                        droppable: false,
                    },
                    {
                        label: 'Создать тренажер',
                        data: { url: `/admin/trainer/create`, type: 'create', parentId: module.id },
                        icon: 'pi pi-plus',
                        draggable: false,
                        droppable: false,
                    },
                    {
                        label: 'Создать тест',
                        data: { url: `/admin/test/create`, type: 'create', parentId: module.id },
                        icon: 'pi pi-plus',
                        draggable: false,
                        droppable: false,
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
            icon: module.type === 'lesson' ? 'pi pi-file' : 'pi pi-code',
            draggable: !!parentId,
            droppable: !!parentId,
        };
    }
}
