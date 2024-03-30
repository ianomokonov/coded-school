import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from '../services/task.service';
import { TaskDto } from '../dto/task/task.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CheckTaskDto } from '../dto/task/check-trainer.dto';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';

@ApiTags('Trainer:Task')
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':id')
  async getTrainer(@Param('id') id: number): Promise<TaskDto> {
    return this.taskService.read(id);
  }

  @Get(':id/full')
  async getTrainerFull(@Param('id') id: number): Promise<TaskDto> {
    return this.taskService.read(id, true);
  }

  @Post(':id/check')
  async checkTrainer(
    @Param('id') id: number,
    @Body() body: CheckTaskDto,
  ): Promise<boolean> {
    return this.taskService.check(id, body.html);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'files' },
      { name: 'resultFiles' },
      { name: 'contentFiles' },
    ]),
  )
  createTrainer(
    @Body() body: CreateTaskDto,
    @UploadedFiles()
    files: {
      files: Express.Multer.File[];
      resultFiles: Express.Multer.File[];
      contentFiles: Express.Multer.File[];
    },
  ) {
    return this.taskService.create(
      body,
      files.files,
      files.resultFiles,
      files.contentFiles,
    );
  }
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'files' },
      { name: 'resultFiles' },
      { name: 'contentFiles' },
    ]),
  )
  updateTrainer(
    @Param('id') id: number,
    @Body() body: UpdateTaskDto,
    @UploadedFiles()
    files: {
      files: Express.Multer.File[];
      resultFiles: Express.Multer.File[];
      contentFiles: Express.Multer.File[];
    },
  ) {
    return this.taskService.update(
      id,
      body,
      files.files,
      files.resultFiles,
      files.contentFiles,
    );
  }
}
