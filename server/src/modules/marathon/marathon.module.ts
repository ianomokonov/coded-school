import { Module } from '@nestjs/common';
import { MarathonController } from './marathon.controller';
import { MarathonService } from './marathon.service';

@Module({
  controllers: [MarathonController],
  imports: [],
  providers: [MarathonService],
})
export class MarathonModule {}
