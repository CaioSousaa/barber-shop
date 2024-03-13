import { ApiProperty } from '@nestjs/swagger';
import { Cutting, DyeHair } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDTO {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  startAt: Date;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  cut?: Cutting;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  @IsString({ message: 'this variable userId need to be sting' })
  userId: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  dye_hair?: DyeHair;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  @IsString({ message: 'this variable eyebrows need to be sting' })
  eyebrows?: string;

  @ApiProperty()
  payment: number;

  @ApiProperty()
  endAt: Date;
}
