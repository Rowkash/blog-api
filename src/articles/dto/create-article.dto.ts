import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'World Crisis', description: 'Article title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example:
      'Google Translate is a web-based free-to-user translation service developed by Google in April 2006. It translates multiple forms of texts and media such as words, phrases and webpages. Originally, Google Translate was released as a statistical machine translation service.',
    description: 'Article text',
  })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
