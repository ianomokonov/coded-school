import { CommentDto } from '@api/index';

export interface Comment extends CommentDto {
    isEditing?: boolean;
}
