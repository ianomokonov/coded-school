import { Injectable } from '@nestjs/common';
import { ModuleEntity } from 'src/entities/module/module.entity';
import { SaveModuleDto } from './dto/create-module.dto';
import { UserModuleEntity } from 'src/entities/module/user-module.entity';
import { ModuleDto } from './dto/module.dto';

@Injectable()
export class ModuleService {
  async createModule(dto: SaveModuleDto) {
    const { id } = await ModuleEntity.create({ name: dto.name }).save();
    return id;
  }

  async updateModule(moduleId: number, dto: SaveModuleDto) {
    await ModuleEntity.save({ id: moduleId, name: dto.name });
  }

  async deleteModule(moduleId: number) {
    await ModuleEntity.delete({ id: moduleId });
  }

  async readModule(moduleId: number): Promise<ModuleDto> {
    const module = await ModuleEntity.findOne({ where: { id: moduleId } });
    return module;
  }

  async getAllModules(): Promise<ModuleDto[]> {
    const modules = await ModuleEntity.find();
    return modules.map((m) => ({ id: m.id, name: m.name }));
  }

  async startModule(moduleId: number, userId: number) {
    await UserModuleEntity.create({ userId, moduleId }).save();
  }

  async completeModule(moduleId: number, userId: number) {
    await UserModuleEntity.save({ userId, moduleId, isCompleted: true });
  }
}
