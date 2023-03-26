import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';
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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentAuthorGuard } from 'src/guards/comment-author.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './comment.model';

@ApiTags('Comments')
@Controller('articles/:articleId/comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  // ---------- Create Comment ---------- //

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 200, type: Comment })
  @ApiResponse({ status: 400, type: Comment })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreateCommentDto,
    @Request() req,
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    const authorId = req.user.id;
    return this.commentsService.createComment(dto, articleId, authorId);
  }

  // ---------- Create Child Comment ---------- //

  @UseGuards(JwtAuthGuard)
  @Post('/:parentId')
  createChildComment(
    @Body() dto: CreateCommentDto,
    @Request() req,
    @Param('articleId', ParseIntPipe) articleId: number,
    @Param('parentId', ParseIntPipe) parentId: number,
  ) {
    const authorId = req.user.id;
    return this.commentsService.createChildComment(
      dto,
      articleId,
      authorId,
      parentId,
    );
  }
  // ---------- Get Comment ---------- //

  @UseGuards(JwtAuthGuard)
  @Get('/:commentId')
  getOne(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentsService.getCommentById(commentId);
  }

  // ---------- Get All Article Comments

  @ApiOperation({ summary: 'Get all articles comments' })
  @ApiResponse({ status: 200, type: [Comment] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Param('articleId', ParseIntPipe) articleId: number) {
    return this.commentsService.getAllArticleComments(articleId);
  }

  // ---------- Update Article Comment ---------- //

  @UseGuards(JwtAuthGuard, CommentAuthorGuard)
  @Put('/:commentId')
  update(
    @Body() dto: CreateCommentDto,
    @Param('commentId', ParseIntPipe) commentId: number,
  ) {
    return this.commentsService.updateComment(commentId, dto);
  }

  // ---------- Delete Article Comment ---------- //

  @UseGuards(JwtAuthGuard, CommentAuthorGuard)
  @Delete('/:commentId')
  delete(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
