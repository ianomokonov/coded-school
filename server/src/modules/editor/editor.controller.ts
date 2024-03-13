import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditorService } from '@modules/editor/editor.service';
import { FilesTreeDto } from '@dtos/editor/files-tree.dto';

@ApiTags('Editor')
@Controller('editor')
export class EditorController {
  constructor(private editorService: EditorService) {}

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
