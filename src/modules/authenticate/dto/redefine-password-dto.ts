import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RedefinePasswordDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(4, 50, {
    message:
      'This password variable can lenght min 4 characteres or max 50 characteres',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  confirmPassword: string;
}
