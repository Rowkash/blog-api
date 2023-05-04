import * as Swagger from '@nestjs/swagger';
import * as NestDecorators from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Article } from 'src/articles/article.model';
import { ArticlesService } from './articles.service';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ArticleAuthorGuard } from 'src/guards/article-author.guard';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@Swagger.ApiTags('Articles')
@Swagger.ApiBearerAuth()
@NestDecorators.Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  // ---------- Create Article ---------- //

  @Swagger.ApiOperation({ summary: 'Create Article' })
  @Swagger.ApiCreatedResponse({ type: Article })
  @Swagger.ApiConsumes('multipart/form-data')
  @NestDecorators.UseGuards(JwtAuthGuard)
  @NestDecorators.UseInterceptors(FileInterceptor('image'))
  @NestDecorators.Post()
  create(
    @NestDecorators.Body() dto: CreateArticleDto,
    @NestDecorators.Request() req,
    @NestDecorators.UploadedFile() image,
  ) {
    console.log(req.user);
    const authorId = req.user.id;
    dto.image = image;
    return this.articlesService.createArticle(dto, authorId);
  }

  // ---------- Update Article By Id ---------- //

  @Swagger.ApiOperation({ summary: 'Update article by ID' })
  @Swagger.ApiOkResponse({ type: Article })
  @Swagger.ApiConsumes('multipart/form-data')
  @NestDecorators.UseGuards(JwtAuthGuard, ArticleAuthorGuard)
  @NestDecorators.UseInterceptors(FileInterceptor('image'))
  @NestDecorators.Put('/:id')
  update(
    @NestDecorators.Param('id', NestDecorators.ParseIntPipe) articleId: number,
    @NestDecorators.Body() dto: UpdateArticleDto,
    @NestDecorators.UploadedFile() image,
  ) {
    dto.image = image;
    return this.articlesService.updateArticle(articleId, dto);
  }

  // ---------- Delete article by Id ---------- //

  @Swagger.ApiOperation({ summary: 'Delete Article by id' })
  @Swagger.ApiNoContentResponse({ content: {} })
  @NestDecorators.UseGuards(JwtAuthGuard, ArticleAuthorGuard)
  @NestDecorators.Delete('/:id')
  delete(@NestDecorators.Param('id', NestDecorators.ParseIntPipe) id: number) {
    return this.articlesService.deleteArticle(id);
  }

  // ---------- Get All Articles ---------- //

  @Swagger.ApiOperation({ summary: 'Get all articles' })
  @Swagger.ApiOkResponse({ type: [Article] })
  @NestDecorators.Get()
  getAll() {
    return this.articlesService.getAllArticles();
  }

  // ---------- Get One Article By Id ---------- //

  @Swagger.ApiOperation({ summary: 'Get article by ID' })
  @Swagger.ApiOkResponse({ type: Article })
  @NestDecorators.Get('/:id')
  getOne(@NestDecorators.Param('id', NestDecorators.ParseIntPipe) id: number) {
    return this.articlesService.getArticleById(id);
  }
}
