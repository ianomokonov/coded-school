import { AutoMap } from '@automapper/classes';
import { UserShortDto } from '@dtos/user/user.dto';

export class CommentDto {
  id: number;
  lessonId: number;
  @AutoMap(() => UserShortDto)
  user: UserShortDto;
  createDate: Date;
  text: string;
}
