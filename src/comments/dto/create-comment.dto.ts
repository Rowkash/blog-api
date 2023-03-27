import { ApiProperty } from '@nestjs/swagger';
import * as Validator from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example:
      "Seriously though thank you all for submitting your cars and we're sorry we couldn't put everyone in this video! Where do you think your car would fall on the list?",
    description: 'Text of comment',
  })
  @Validator.IsNotEmpty()
  @Validator.IsString()
  readonly content: string;
}
