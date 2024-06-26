import { Module } from '@nestjs/common';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';

@Module({
  controllers: [AchievementController],
  imports: [],
  providers: [AchievementService],
  exports: [AchievementService],
})
export class AchievementModule {}
