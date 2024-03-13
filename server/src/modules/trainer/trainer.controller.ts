import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainerService } from './trainer.service';
import { FilesTreeDto } from './dto/files-tree.dto';

@ApiTags('Trainer')
@Controller('trainer')
export class TrainerController {
  constructor(private editorService: TrainerService) {}

  @Post()
  // @ApiBearerAuth('JWT')
  // @UseGuards(JwtAuthGuard)
  async runEditor(): Promise<void> {
    return this.editorService.runEditor();
  }

  @Get('/:name')
  async getEditorCode(
    @Param('name') fileName: string,
  ): Promise<StreamableFile> {
    return this.editorService.getPackageData(fileName);
  }

  @Get()
  async getFiles(@Query('dir') dir: string): Promise<FilesTreeDto[]> {
    return this.editorService.getFiles(dir);
  }
}
