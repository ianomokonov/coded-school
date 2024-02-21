import { Transform } from 'class-transformer';

export class GetAllNotesDto {
  @Transform(({ value }) => value === 'true')
  isFavorite?: boolean;
  moduleId?: number;
}
