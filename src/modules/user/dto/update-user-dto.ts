import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class UpdatUserDTO {
  @IsString({ message: 'this variable name need to be string' })
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsString({ message: 'this variable email need to be string' })
  @IsOptional()
  @ApiPropertyOptional()
  @IsEmail()
  email?: string;

  @IsString({ message: 'this variable cpf need to be string' })
  @IsOptional()
  @ApiPropertyOptional()
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'this CPF variable must comply with the format XXX.XXX.XXX-XX',
  })
  cpf?: string;
}
