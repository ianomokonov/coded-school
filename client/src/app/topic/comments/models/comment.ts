import { SafeHtml } from '@angular/platform-browser';
import { CommentDto } from '@api/index';

export interface Comment extends CommentDto {
    isEditing?: boolean;
    quoteHtml?: SafeHtml;
}
