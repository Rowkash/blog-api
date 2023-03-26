import { UpdateArticleDto } from './dto/update-article.dto';
import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.model';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article) private articleRepository: typeof Article,
    private fileService: FilesService,
  ) {}

  // ---------- Create Article ---------- //

  async createArticle(dto: CreateArticleDto, authorId: number, image: any) {
    const fileName = await this.fileService.createFile(image);
    const article = await this.articleRepository.create({
      ...dto,
      authorId: authorId,
      image: fileName,
    });
    return article;
  }

  // ---------- Get All Articles ---------- //

  async getAllArticles() {
    const articles = await this.articleRepository.findAll();
    return articles;
  }

  // ---------- Get Article and Increase view count ---------- //

  async getArticleById(articleId: number) {
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

  // ---------- Update Article By Id ---------- //

  async updateArticle(articleId: number, dto: UpdateArticleDto) {
    const article = await this.articleRepository.findByPk(articleId);

    await article.update(dto);
    return article;
  }

  // ---------- Get One Article By Id ---------- //

  async getOneArticle(articleId: number) {
    const article = await this.articleRepository.findByPk(articleId);
    if (!article) {
      throw new NotFoundException(`Article with id ${articleId} not found`);
    }
    return article;
  }
}
