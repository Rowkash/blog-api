import { User } from '../users/user.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from '../comments/comment.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'articles' })
export class Article extends Model<Article> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'World Crisis', description: 'Article title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example:
      'Google Translate is a web-based free-to-user translation service developed by Google in April 2006. It translates multiple forms of texts and media such as words, phrases and webpages. Originally, Google Translate was released as a statistical machine translation service.',
    description: 'Article text',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: '56', description: 'Views Count' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  viewsCount: number;

  @ApiProperty({ example: '5', description: 'Author ID' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @HasMany(() => Comment)
  comments: Comment[];

  incrementViewCount() {
    this.viewsCount += 1;
    return this.save();
  }
}
