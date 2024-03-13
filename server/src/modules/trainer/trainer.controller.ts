import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainerService } from './trainer.service';
import { TrainerDto } from './dto/trainer.dto';

@ApiTags('Trainer')
@Controller('trainer')
export class TrainerController {
  constructor(private editorService: TrainerService) {}

  //   @Post()
  // @ApiBearerAuth('JWT')
  // @UseGuards(JwtAuthGuard)
  //   async runEditor(): Promise<void> {
  //     return this.editorService.runEditor();
  //   }

  @Get(':id')
  async getTrainer(@Param('id') id: number): Promise<TrainerDto> {
    return this.editorService.getTrainer(id);
  }

  @Get(':id/check')
  async checkTrainer(@Param('id') id: number): Promise<boolean> {
    return this.editorService.checkTrainer(id);
  }
}
