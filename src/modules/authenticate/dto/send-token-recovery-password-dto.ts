import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendTokenRecoveryPasswordDTO {
  @IsString({ message: 'this variable name needs to be string' })
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
