import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserType } from '../enums/user-type.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  user_type?: UserType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  verification_code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email_verified: boolean;
}
