import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainerService } from '../services/trainer.service';
import { TrainerShortDto } from '../dto/trainer-short.dto';

@ApiTags('Trainer')
@Controller('admin-trainer')
export class TrainerController {
  constructor(private trainerService: TrainerService) {}

  @Get('all')
  async getAllTrainers(): Promise<TrainerShortDto[]> {
    return this.trainerService.readAllTrainers();
  }

  @Delete(':id')
  async deleteTrainer(@Param('id') id: number): Promise<void> {
    return this.trainerService.delete(id);
  }
}
