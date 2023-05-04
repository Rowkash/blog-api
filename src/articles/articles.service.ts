import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { Article } from './article.model';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article) private articleRepository: typeof Article,
    private fileService: FilesService,
  ) {}

  // ---------- Create Article ---------- //

  async createArticle(
    dto: CreateArticleDto,
    authorId: number,
  ): Promise<Article> {
    if (dto.image) {
      dto.image = await this.fileService.createFile(dto.image);
    }

    const article = await this.articleRepository.create({
      ...dto,
      authorId: authorId,
    });

    return article;
  }

  // ---------- Update Article By Id ---------- //

  async updateArticle(
    articleId: number,
    dto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.articleRepository.findByPk(articleId);

    if (dto.image) {
      dto.image = await this.fileService.createFile(dto.image);
    }

    await article.update(dto);

    return article;
  }

  // ---------- Get All Articles ---------- //

  async getAllArticles(): Promise<Article[]> {
    const articles = await this.articleRepository.findAll();
    return articles;
  }

  // ---------- Get Article and Increase view count ---------- //

  async getArticleById(articleId: number): Promise<Article> {
    const article = await this.articleRepository.findByPk(articleId);

    await article.incrementViewCount();
    return article;
  }

  // ---------- Delete article by Id ---------- //
  async deleteArticle(articleId: number) {
    const article = await this.articleRepository.findByPk(articleId);

    await article.destroy();
    return HttpStatus.NO_CONTENT;
  }

  // ---------- Get One Article By Id ---------- //

  async getOneArticle(articleId: number): Promise<Article> {
    const article = await this.articleRepository.findByPk(articleId);
    if (!article) {
      throw new NotFoundException(`Article with id ${articleId} not found`);
    }
    return article;
  }
}
