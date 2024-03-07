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
            this.modules = modules.map((m) => this.getTree(m));
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
                children: module.topics?.map((t) => this.getTree(t)),
            };
        }
        if ('lessons' in module) {
            return {
                label: module.name,
                icon: `pi pi-sitemap`,
                data: `/admin/topic/${module.id}`,
                children: module.lessons?.map((t) => this.getTree(t)),
            };
        }

        return {
            label: module.name,
            data: `/admin/lesson/${module.id}`,
            icon: 'pi pi-file',
        };
    }
}
