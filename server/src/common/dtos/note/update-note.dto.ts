export class UpdateNoteDto {
  content?: string;
  isFavorite?: boolean;
  name?: string;
  moduleId?: number;
  filesToDelete?: string[];
}
