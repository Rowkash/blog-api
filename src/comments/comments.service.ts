import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentsRepository: typeof Comment,
    private articlesService: ArticlesService,
  ) {}

  // ---------- Create Comment ---------- //

  async createComment(
    dto: CreateCommentDto,
    articleId: number,
    authorId: number,
  ): Promise<Comment> {
    return await this.commentsRepository.create({
      ...dto,
      articleId,
      authorId,
    });
  }

  // ---------- Create Child Comment ---------- //

  async createChildComment(
    dto: CreateCommentDto,
    articleId: number,
    authorId: number,
    parentId: number,
  ): Promise<Comment> {
    return await this.commentsRepository.create({
      ...dto,
      articleId,
      authorId,
      parentId,
    });
  }

  // ---------- Get All Article Comments ---------- //

  async getAllArticleComments(articleId: number): Promise<Comment[]> {
    const article = await this.articlesService.getArticleById(articleId);

    if (article) {
      const comments = this.commentsRepository.findAll({
        where: { articleId: articleId },
      });
      return comments;
    }
  }

  // ---------- Update comment ---------- //

  async updateComment(
    commentId: number,
    dto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = await this.getCommentById(commentId);
    await comment.update(dto);
    return comment;
  }

  // ---------- Delete Comment ---------- //

  async deleteComment(commentId: number) {
    const comment = await this.getCommentById(commentId);
    comment.destroy();
    return HttpStatus.NO_CONTENT;
  }

  // ---------- Get Comment By Id ---------- //

  async getCommentById(commentId: number): Promise<Comment> {
    const comment = await this.commentsRepository.findByPk(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with id ${commentId} not found`);
    }
    return comment;
  }
}
