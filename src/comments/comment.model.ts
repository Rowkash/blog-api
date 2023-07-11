import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Article } from 'src/articles/article.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: `Yeah, it's`, description: 'Text of commentary' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({ example: 3, description: 'Author ID' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  authorId: number;

  @ApiProperty({ type: () => User })
  @BelongsTo(() => User)
  author: User;

  @ApiProperty({ example: 1, description: 'Article ID' })
  @ForeignKey(() => Article)
  @Column({ type: DataType.INTEGER })
  articleId: number;

  @ApiProperty({ type: Article, description: 'Article' })
  @BelongsTo(() => Article)
  article: Article;

  @ApiProperty({ example: 5, description: 'Parent comment ID' })
  @ForeignKey(() => Comment)
  @Column({ type: DataType.INTEGER })
  parentId: number;

  @BelongsTo(() => Comment)
  parent: Comment;

  @HasMany(() => Comment)
  children: Comment[];
}
