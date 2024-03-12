import { ApiProperty } from '@nestjs/swagger';
import { Cutting, DyeHair } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDTO {
  @IsDate({ message: 'this variable start need to be date' })
  @IsNotEmpty()
  @ApiProperty()
  startAt: Date;

  @IsNotEmpty()
  @ApiProperty()
  @IsString({ message: 'this variable userId need to be string' })
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber({})
  paymemt: number;

  @IsNotEmpty()
  @ApiProperty()
  cut: Cutting;

  @IsNotEmpty()
  @ApiProperty()
  dye_hair: DyeHair;

  @IsNotEmpty()
  @ApiProperty()
  eyebrows: string;
}
