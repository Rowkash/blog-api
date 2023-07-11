import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class CheckArticleMiddleware implements NestMiddleware {
  constructor(private articleService: ArticlesService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const articleId = Number(req.params.articleId);
    const articleExists = await this.articleService.getOneArticle(articleId);

    if (!articleExists) {
      throw new NotFoundException(`Article with id ${articleId} not found`);
    }
    next();
  }
}
