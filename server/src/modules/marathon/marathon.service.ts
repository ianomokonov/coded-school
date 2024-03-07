import { Injectable, NotFoundException } from '@nestjs/common';
import { SaveMarathonDto } from '@dtos/marathon/save-marathon.dto';
import { MarathonEntity } from '@entities/marathon/marathon.entity';
import { MarathonDto } from '@dtos/marathon/marathon.dto';
import { UserMarathonEntity } from '@entities/marathon/user-marathon.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { AchievementService } from '@modules/achievement/achievement.service';
import { dateTimeNow } from '@core/date-now.fn';

@Injectable()
export class MarathonService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    private achievementService: AchievementService,
  ) {}

  async createMarathon(dto: SaveMarathonDto) {
    const { id } = await MarathonEntity.create({ ...dto }).save();
    return id;
  }

  async updateMarathon(marathonId: number, dto: SaveMarathonDto) {
    await MarathonEntity.update({ id: marathonId }, { ...dto });
  }

  async deleteMarathon(marathonId: number) {
    await MarathonEntity.delete({ id: marathonId });
  }

  async readMarathon(marathonId: number): Promise<MarathonDto> {
    const marathon = await MarathonEntity.findOne({
      where: { id: marathonId },
    });

    if (!marathon) {
      throw new NotFoundException('Марафон не найден');
    }
    return this.mapper.map(marathon, MarathonEntity, MarathonDto);
  }

  async readUserMarathon(
    marathonId: number,
    userId: number,
  ): Promise<MarathonDto> {
    const marathon = await UserMarathonEntity.findOne({
      where: { marathonId, userId },
      relations: { marathon: true },
    });

    if (!marathon) {
      throw new NotFoundException('Марафон не найден');
    }
    return this.mapper.map(marathon, UserMarathonEntity, MarathonDto);
  }

  async getAllMarathons(): Promise<MarathonDto[]> {
    const modules = await MarathonEntity.find();
    return modules.map((m) => this.mapper.map(m, MarathonEntity, MarathonDto));
  }

  async createUserMarathon(marathonId: number, userId: number) {
    await UserMarathonEntity.create({ userId, marathonId }).save();
  }

  async startMarathon(marathonId: number, userId: number) {
    await UserMarathonEntity.update(
      { userId, marathonId },
      { isStarted: true, startDate: dateTimeNow() },
    );
  }

  async completeMarathon(marathonId: number, userId: number) {
    const result = await UserMarathonEntity.update(
      { userId, marathonId },
      { isCompleted: true },
    );

    if (!result.affected) {
      throw new NotFoundException('Марафон пользователя не найден');
    }

    const marathon = await MarathonEntity.findOne({
      where: { id: marathonId },
    });

    if (!marathon) {
      return;
    }

    await this.achievementService.setUserPoints(
      userId,
      (points) => points + marathon.points,
    );
  }
}
