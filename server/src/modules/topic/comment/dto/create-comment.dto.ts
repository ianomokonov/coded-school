import { UpdateCommentDto } from './update-comment.dto';

export class CreateCommentDto extends UpdateCommentDto {
  lessonId: number;
  relativeCommentId?: number;
}
