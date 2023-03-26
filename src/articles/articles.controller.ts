import { Article } from 'src/articles/article.model';
import { ArticlesService } from './article.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ArticleAuthorGuard } from 'src/guards/article-author.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  // ---------- Create Article ---------- //

  @Post()
  @ApiOperation({ summary: 'Create Article' })
  @ApiCreatedResponse({ type: Article })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto: CreateArticleDto, @Request() req, @UploadedFile() image) {
    const authorId = req.user.id;
    return this.articlesService.createArticle(dto, authorId, image);
  }

  // ---------- Get All Articles ---------- //

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiOkResponse({ type: [Article] })
  getAll() {
    return this.articlesService.getAllArticles();
  }

  // ---------- Get One Article By Id ---------- //

  @Get('/:id')
  @ApiOperation({ summary: 'Get article by ID' })
  @ApiOkResponse({ type: Article })
  // @ApiNotFoundResponse({})
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.getArticleById(id);
  }

  // ---------- Delete article by Id ---------- //

  @ApiOperation({ summary: 'Delete Article by id' })
  @ApiResponse({ status: 204, content: {} })
  @UseGuards(JwtAuthGuard, ArticleAuthorGuard)
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.deleteArticle(id);
  }

  // ---------- Update Article By Id ---------- //

  @ApiOperation({ summary: 'Update article by ID' })
  @ApiResponse({ status: 200, type: Article })
  @UseGuards(JwtAuthGuard, ArticleAuthorGuard)
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) articleId: number,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articlesService.updateArticle(articleId, dto);
  }
}
