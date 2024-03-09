import { AutoMap } from '@automapper/classes';
import { UserShortDto } from '@dtos/user/user.dto';

export class CommentDto {
  id: number;
  lessonId: number;
  createDate: Date;
  text: string;

  @AutoMap(() => UserShortDto)
  user: UserShortDto;

  @AutoMap(() => CommentDto)
  relativeComment?: CommentDto;
}
