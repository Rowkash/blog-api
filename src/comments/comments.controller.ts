import * as NestDecorators from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentAuthorGuard } from 'src/guards/comment-author.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
import { Comment } from './comment.model';

@Swagger.ApiTags('Comments')
@NestDecorators.Controller('articles/:articleId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  // ---------- Create Comment ---------- //

  @Swagger.ApiOperation({ summary: 'Create comment' })
  @Swagger.ApiCreatedResponse({ type: Comment })
  @NestDecorators.UseGuards(JwtAuthGuard)
  @NestDecorators.Post()
  create(
    @NestDecorators.Body() dto: CreateCommentDto,
    @NestDecorators.Request() req,
    @NestDecorators.Param('articleId', NestDecorators.ParseIntPipe)
    articleId: number,
  ) {
    const authorId = req.user.id;
    return this.commentsService.createComment(dto, articleId, authorId);
  }

  // ---------- Create Child Comment ---------- //

  @Swagger.ApiOperation({ summary: 'Create Child Comment' })
  @Swagger.ApiCreatedResponse({ type: Comment })
  @NestDecorators.UseGuards(JwtAuthGuard)
  @NestDecorators.Post('/:parentId')
  createChildComment(
    @NestDecorators.Body() dto: CreateCommentDto,
    @NestDecorators.Request() req,
    @NestDecorators.Param('articleId', NestDecorators.ParseIntPipe)
    articleId: number,
    @NestDecorators.Param('parentId', NestDecorators.ParseIntPipe)
    parentId: number,
  ) {
    const authorId = req.user.id;
    return this.commentsService.createChildComment(
      dto,
      articleId,
      authorId,
      parentId,
    );
  }
  // ---------- Get Comment by ID ---------- //

  @Swagger.ApiOperation({ summary: 'Get Comment by ID' })
  @Swagger.ApiOkResponse({ type: Comment })
  @NestDecorators.UseGuards(JwtAuthGuard)
  @NestDecorators.Get('/:commentId')
  getOne(
    @NestDecorators.Param('commentId', NestDecorators.ParseIntPipe)
    commentId: number,
  ) {
    return this.commentsService.getCommentById(commentId);
  }

  // ---------- Get All Article Comments ---------- //

  @Swagger.ApiOperation({ summary: 'Get all article comments' })
  @Swagger.ApiOkResponse({ type: [Comment] })
  @NestDecorators.UseGuards(JwtAuthGuard)
  @NestDecorators.Get()
  getAll(
    @NestDecorators.Param('articleId', NestDecorators.ParseIntPipe)
    articleId: number,
  ) {
    return this.commentsService.getAllArticleComments(articleId);
  }

  // ---------- Update Article Comment by ID ---------- //

  @Swagger.ApiOperation({ summary: 'Update Article Comment by ID' })
  @Swagger.ApiOkResponse({ type: Comment })
  @NestDecorators.UseGuards(JwtAuthGuard, CommentAuthorGuard)
  @NestDecorators.Put('/:commentId')
  update(
    @NestDecorators.Body() dto: CreateCommentDto,
    @NestDecorators.Param('commentId', NestDecorators.ParseIntPipe)
    commentId: number,
  ) {
    return this.commentsService.updateComment(commentId, dto);
  }

  // ---------- Delete Article Comment by ID ---------- //

  @Swagger.ApiOperation({ summary: 'Delete Article Comment by ID' })
  @Swagger.ApiNoContentResponse()
  @NestDecorators.UseGuards(JwtAuthGuard, CommentAuthorGuard)
  @NestDecorators.Delete('/:commentId')
  delete(
    @NestDecorators.Param('commentId', NestDecorators.ParseIntPipe)
    commentId: number,
  ) {
    return this.commentsService.deleteComment(commentId);
  }
}
