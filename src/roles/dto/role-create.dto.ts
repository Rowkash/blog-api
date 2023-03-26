import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'Moderator', description: 'Role name' })
  @IsString()
  readonly value: string;

  @ApiProperty({ example: 'Sites moderator', description: 'Role description' })
  @IsString()
  readonly description: string;
}
