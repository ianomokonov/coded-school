import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LessonDto, ModuleDto, ModuleService, TopicDto } from '@api/index';
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
        private router: Router,
    ) {
        this.modulesService.getModulesTree().subscribe((modules) => {
            this.modules = [
                ...modules.map((m) => this.getTree(m)),
                {
                    label: 'Создать модуль',
                    data: `/admin/module/create`,
                    icon: 'pi pi-plus',
                },
            ];
        });
    }

    nodeSelect({ node }: { node: TreeNode }) {
        this.router.navigate([node.data]);
    }

    private getTree(module: ModuleDto | TopicDto | LessonDto): TreeNode {
        if ('topics' in module) {
            return {
                label: module.name,
                data: `/admin/module/${module.id}`,
                icon: 'pi pi-server',
                children: [
                    ...(module.topics?.map((t) => this.getTree(t)) || []),
                    {
                        label: 'Создать тему',
                        data: `/admin/topic/create`,
                        icon: 'pi pi-plus',
                    },
                ],
            };
        }
        if ('lessons' in module) {
            return {
                label: module.name,
                icon: `pi pi-sitemap`,
                data: `/admin/topic/${module.id}`,
                children: [
                    ...(module.lessons?.map((t) => this.getTree(t)) || []),
                    {
                        label: 'Создать урок',
                        data: `/admin/lesson/create`,
                        icon: 'pi pi-plus',
                    },
                ],
            };
        }

        return {
            label: module.name,
            data: `/admin/lesson/${module.id}`,
            icon: 'pi pi-file',
        };
    }
}
