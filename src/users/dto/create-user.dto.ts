import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Dagget', description: 'User name' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Name must have 4-16 symbol' })
  readonly name: string;

  @ApiProperty({ example: 'beaver@river.com', description: 'User email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: '12345sdsd', description: 'User password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Password should have 4-16 symbols' })
  readonly password: string;
}
