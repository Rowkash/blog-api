import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ArticlesService } from 'src/articles/article.service';

@Injectable()
export class CheckArticleMiddleware implements NestMiddleware {
  constructor(private articleService: ArticlesService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const articleId = Number(req.params.articleId);
    const article = await this.articleService.getOneArticle(articleId);

    if (article) {
      return next();
    }
  }
}
