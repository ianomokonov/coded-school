/* tslint:disable */
/* eslint-disable */
import { MoveChildDto } from '../models/move-child-dto';
export interface MoveTopicChildDto {
  child: MoveChildDto;
  prevChild?: MoveChildDto;
  topicId: number;
}
