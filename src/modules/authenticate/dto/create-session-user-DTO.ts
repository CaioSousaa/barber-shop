import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateSessionUserDTO {
  @IsString({ message: 'this variable CPF need to be string' })
  @IsNotEmpty()
  @ApiProperty()
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'this CPF variable must comply with the format XXX.XXX.XXX-XX',
  })
  cpf: string;

  @IsString({ message: 'this variable email need to be string' })
  @IsNotEmpty()
  @ApiProperty()
  @Length(4, 50, {
    message:
      'This password variable can lenght min 4 characteres or max 50 characteres',
  })
  password: string;
}
