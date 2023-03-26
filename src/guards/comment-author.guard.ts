import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class CommentAuthorGuard implements CanActivate {
  constructor(private commentService: CommentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const commentId = request.params.commentId;
    const user = request.user.id;
    const comment = await this.commentService.getCommentById(commentId);

    if (comment.authorId !== user) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action.',
      );
    }

    return true;
  }
}
