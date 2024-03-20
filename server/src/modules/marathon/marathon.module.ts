import { Module } from '@nestjs/common';
import { MarathonController } from './marathon.controller';
import { MarathonService } from './marathon.service';
import { AchievementModule } from '@modules/achievement/achievement.module';

@Module({
  controllers: [MarathonController],
  imports: [AchievementModule],
  providers: [MarathonService],
})
export class MarathonModule {}
