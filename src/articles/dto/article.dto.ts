import * as Swagger from '@nestjs/swagger';
import * as Validator from 'class-validator';

// ---------- Create Article DTO ---------- //

export class CreateArticleDto {
  // ---------- Title ---------- //

  @Swagger.ApiProperty({
    example: 'World Crisis',
    description: 'Article title',
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  readonly title: string;

  // ---------- Content ---------- //

  @Swagger.ApiProperty({
    example:
      'Google Translate is a web-based free-to-user translation service developed by Google in April 2006. It translates multiple forms of texts and media such as words, phrases and webpages. Originally, Google Translate was released as a statistical machine translation service.',
    description: 'Article text',
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  readonly content: string;

  // ---------- Image ---------- //

  @Swagger.ApiProperty({ type: 'string', format: 'binary', required: false })
  @Validator.IsOptional()
  image: any;
}

// ---------- Update Article DTO ---------- //

export class UpdateArticleDto extends CreateArticleDto {}
