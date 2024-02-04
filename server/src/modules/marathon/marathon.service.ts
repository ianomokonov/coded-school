import { Injectable, NotFoundException } from '@nestjs/common';
import { SaveMarathonDto } from './dto/save-marathon.dto';
import { MarathonEntity } from 'src/entities/marathon/marathon.entity';
import { MarathonDto } from './dto/marathon.dto';
import { UserMarathonEntity } from 'src/entities/marathon/user-marathon.entity';

@Injectable()
export class MarathonService {
  async createMarathon(dto: SaveMarathonDto) {
    const { id } = await MarathonEntity.create({ name: dto.name }).save();
    return id;
  }

  async updateMarathon(marathonId: number, dto: SaveMarathonDto) {
    await MarathonEntity.update({ id: marathonId }, { name: dto.name });
  }

  async deleteMarathon(marathonId: number) {
    await MarathonEntity.delete({ id: marathonId });
  }

  async readMarathon(marathonId: number): Promise<MarathonDto> {
    const module = await MarathonEntity.findOne({ where: { id: marathonId } });
    return module;
  }

  async getAllMarathons(): Promise<MarathonDto[]> {
    const modules = await MarathonEntity.find();
    return modules.map((m) => ({ id: m.id, name: m.name }));
  }

  async startMarathon(marathonId: number, userId: number) {
    await UserMarathonEntity.create({ userId, marathonId }).save();
  }

  async completeMarathon(marathonId: number, userId: number) {
    const result = await UserMarathonEntity.update(
      { userId, marathonId },
      { isCompleted: true },
    );

    if (!result.affected) {
      throw new NotFoundException('Марафон пользователя не найден');
    }
  }
}
