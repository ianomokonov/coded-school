import { NotFoundException } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { UserAchievementEntity } from 'src/entities/achievement/user-achievement.entity';
import { AchievementEntity } from 'src/entities/achievement/achievement.entity';
import { UserEntity } from 'src/entities/user/user.entity';

describe('AchievementService', () => {
  let achievementService: AchievementService;

  beforeEach(() => {
    achievementService = new AchievementService();
  });

  describe('setUserAchievement', () => {
    it('should throw error if achievement does not exist', async () => {
      jest
        .spyOn<any, any>(achievementService, 'readAchievement')
        .mockImplementation(async () => null);

      try {
        await achievementService.setUserAchievement(1, 1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('should set UserAchievement', async () => {
      const achievmentPoints = 11;
      const entity = new UserAchievementEntity();
      entity.achievement = new AchievementEntity();
      entity.achievement.points = achievmentPoints;
      jest
        .spyOn<any, any>(achievementService, 'readAchievement')
        .mockImplementation(async () => entity.achievement);
      const createSpy = jest
        .spyOn<any, any>(UserAchievementEntity, 'create')
        .mockImplementation(() => entity);
      const saveSpy = jest
        .spyOn<any, any>(entity, 'save')
        .mockImplementation(async () => {});
      const setPointsSpy = jest
        .spyOn(achievementService, 'setUserPoints')
        .mockImplementation(async () => {});

      await achievementService.setUserAchievement(1, 1);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(setPointsSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('setUserPoints', () => {
    it('should set user points', async () => {
      jest
        .spyOn<any, any>(UserEntity, 'findOne')
        .mockImplementation(async () => ({ points: 1 }));
      const updateSpy = jest
        .spyOn<any, any>(UserEntity, 'update')
        .mockImplementation(async () => {});
      updateSpy.mockReset();

      await achievementService.setUserPoints(1, (points) => points + 3);
      expect(updateSpy).toHaveBeenCalledWith({ id: 1 }, { points: 4 });
    });

    it('should not set user points less then zero', async () => {
      jest
        .spyOn<any, any>(UserEntity, 'findOne')
        .mockImplementation(async () => ({ points: 1 }));
      const updateSpy = jest
        .spyOn<any, any>(UserEntity, 'update')
        .mockImplementation(async () => {});
      updateSpy.mockReset();

      await achievementService.setUserPoints(1, (points) => points - 3);
      expect(updateSpy).toHaveBeenCalledWith({ id: 1 }, { points: 0 });
    });
  });
});
