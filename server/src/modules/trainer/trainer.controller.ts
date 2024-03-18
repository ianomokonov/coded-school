import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainerService } from './trainer.service';
import { TrainerDto } from './dto/trainer.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainerShortDto } from './dto/trainer-short.dto';

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

  @Get('all')
  async getAllTrainers(): Promise<TrainerShortDto[]> {
    return this.editorService.readAllTrainers();
  }

  @Get(':id')
  async getTrainer(@Param('id') id: number): Promise<TrainerDto> {
    return this.editorService.read(id);
  }

  @Delete(':id')
  async deleteTrainer(@Param('id') id: number): Promise<void> {
    return this.editorService.delete(id);
  }

  @Get(':id/check')
  async checkTrainer(@Param('id') id: number): Promise<boolean> {
    return this.editorService.checkTrainer(id);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files' }, { name: 'contentFiles' }]),
  )
  createTrainer(
    @Body() body: CreateTrainerDto,
    @UploadedFiles()
    files: {
      files: Express.Multer.File[];
      contentFiles: Express.Multer.File[];
    },
  ) {
    body.files = files.files;
    return this.editorService.create(body, files.contentFiles);
  }
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files' }, { name: 'contentFiles' }]),
  )
  updateTrainer(
    @Param('id') id: number,
    @Body() body: UpdateTrainerDto,
    @UploadedFiles()
    files: {
      files: Express.Multer.File[];
      contentFiles: Express.Multer.File[];
    },
  ) {
    return this.editorService.update(id, body, files.files, files.contentFiles);
  }
}
