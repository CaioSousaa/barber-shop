import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAppointmentDTO } from '../../dto/create-appointment-dto';
import { CreateAppointmentService } from '../../services/create-appointment.service';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Appointment } from '@prisma/client';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly createAppointment: CreateAppointmentService) {}

  @ApiOkResponse({
    status: 201,
    description: 'The appointment has been created',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The appointment has not been created',
  })
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: CreateAppointmentDTO })
  public async create(
    @Body() createAppointmentDTO: CreateAppointmentDTO,
  ): Promise<Appointment> {
    return await this.createAppointment.create(createAppointmentDTO);
  }
}
