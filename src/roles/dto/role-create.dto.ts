import * as Swagger from '@nestjs/swagger';
import * as Validator from 'class-validator';

export class CreateRoleDto {
  @Swagger.ApiProperty({ example: 'Moderator', description: 'Role name' })
  @Validator.IsString()
  readonly value: string;

  @Swagger.ApiProperty({
    example: 'Sites moderator',
    description: 'Role description',
  })
  @Validator.IsString()
  readonly description: string;
}
