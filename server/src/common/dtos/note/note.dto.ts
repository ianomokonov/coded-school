export class NoteDto {
  id: number;
  name: string;
  content?: string;
  moduleId?: number;
  isFavorite: boolean;
}
