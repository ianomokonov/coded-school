import { TrainerService } from '@modules/trainer/services/trainer.service';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Trainer')
@Controller('trainer')
export class TrainerStaticController {
  constructor(private trainerService: TrainerService) {}

  @Get(':id/:fileName')
  async getTrainerFile(
    @Param('id') id: number,
    @Param('fileName') fileName: string,
    @Res() res,
  ) {
    const path = await this.trainerService.getTrainerFilePath(id);

    if (!path) {
      return null;
    }

    res.sendFile(fileName, { root: path });
  }
}
