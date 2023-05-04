import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class ArticleAuthorGuard implements CanActivate {
  constructor(private articlesService: ArticlesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const articleId = request.params.id;
    const user = request.user.id;
    const article = await this.articlesService.getArticleById(articleId);

    if (article.authorId !== user) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action.',
      );
    }

    return true;
  }
}
