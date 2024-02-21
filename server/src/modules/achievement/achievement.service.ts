import { Injectable, NotFoundException } from '@nestjs/common';
import { SaveAchievementDto } from '@dtos/achievment/save-achievement.dto';
import { AchievementDto } from '@dtos/achievment/achievement.dto';
import { AchievementEntity } from '@entities/achievement/achievement.entity';
import { UserAchievementEntity } from '@entities/achievement/user-achievement.entity';
import { UserEntity } from '@entities/user/user.entity';

@Injectable()
export class AchievementService {
  async createAchievement(dto: SaveAchievementDto) {
    const { id } = await AchievementEntity.create({
      ...dto,
    }).save();
    return id;
  }

  async updateAchievement(achievementId: number, dto: SaveAchievementDto) {
    await AchievementEntity.update({ id: achievementId }, { ...dto });
  }

  async deleteAchievement(achievementId: number) {
    await AchievementEntity.delete({ id: achievementId });
  }

  async readAchievement(achievementId: number): Promise<AchievementDto> {
    const module = await AchievementEntity.findOne({
      where: { id: achievementId },
    });
    return { id: module.id, name: module.name, points: module.points };
  }

  async getAllAchievements(): Promise<AchievementDto[]> {
    const modules = await AchievementEntity.find();
    return modules.map((m) => ({ id: m.id, name: m.name, points: m.points }));
  }

  async setUserAchievement(userId: number, achievementId: number) {
    const achievement = await this.readAchievement(achievementId);

    if (!achievement) {
      throw new NotFoundException('Достижение не найдено');
    }
    await UserAchievementEntity.create({
      userId,
      achievementId,
    }).save();
    await this.setUserPoints(userId, (points) => points + achievement.points);
  }

  async setUserPoints(
    userId: number,
    callback: (currentPoints: number) => number,
  ) {
    const { points } = await UserEntity.findOne({ where: { id: userId } });

    const resultPoints = callback(points);

    await UserEntity.update(
      { id: userId },
      { points: resultPoints > 0 ? resultPoints : 0 },
    );
  }
}
