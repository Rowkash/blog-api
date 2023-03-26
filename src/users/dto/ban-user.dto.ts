import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: 3, description: 'User ID' })
  @IsNumber({}, { message: 'Should be a number' })
  userId: number;

  @ApiProperty({ example: 'Bad', description: 'Ban reason' })
  banReason: string;
}
