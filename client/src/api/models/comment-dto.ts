/* tslint:disable */
/* eslint-disable */
import { UserShortDto } from '../models/user-short-dto';
export interface CommentDto {
  createDate: string;
  id: number;
  lessonId: number;
  text: string;
  user: UserShortDto;
}
