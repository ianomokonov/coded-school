import { Module } from '@nestjs/common';
import { EditorController } from '@modules/editor/editor.controller';
import { EditorService } from '@modules/editor/editor.service';

@Module({
  controllers: [EditorController],
  providers: [EditorService],
})
export class EditorModule {}
