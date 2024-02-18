import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleEntity } from '@entities/module/module.entity';
import { SaveModuleDto } from '@dtos/module/create-module.dto';
import { UserModuleEntity } from '@entities/module/user-module.entity';
import { ModuleDto } from '@dtos/module/module.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UserModuleDto } from '@dtos/module/user-module.dto';

@Injectable()
export class ModuleService {
  constructor(@InjectMapper() private mapper: Mapper) {}

  async createModule(dto: SaveModuleDto) {
    const { id } = await ModuleEntity.create({ name: dto.name }).save();
    return id;
  }

  async updateModule(moduleId: number, dto: SaveModuleDto) {
    await ModuleEntity.update({ id: moduleId }, { name: dto.name });
  }

  async deleteModule(moduleId: number) {
    await ModuleEntity.delete({ id: moduleId });
  }

  async readUserModule(
    moduleId: number,
    userId: number,
  ): Promise<UserModuleDto> {
    const userModule = await UserModuleEntity.findOne({
      where: { moduleId, userId },
      relations: {
        module: { topics: true, achievements: true },
        user: { achievements: true },
        topics: true,
      },
    });

    return this.mapper.map(userModule, UserModuleEntity, UserModuleDto);
  }

  async getAllModules(): Promise<ModuleDto[]> {
    const modules = await ModuleEntity.find();
    return modules.map((m) => ({ id: m.id, name: m.name }));
  }

  async startModule(moduleId: number, userId: number) {
    await UserModuleEntity.create({ userId, moduleId }).save();
  }

  async completeModule(moduleId: number, userId: number) {
    const result = await UserModuleEntity.update(
      { userId, moduleId },
      { isCompleted: true },
    );
    if (!result.affected) {
      throw new NotFoundException('Модуль пользователя не найден');
    }
  }
}
