export class MoveTopicChildDto {
  child: MoveChildDto;
  prevChild?: MoveChildDto;
  topicId: number;
}

export class MoveChildDto {
  id: number;
  type: MoveChildType;
}

export enum MoveChildType {
  Trainer = 'trainer',
  Lesson = 'lesson',
}
