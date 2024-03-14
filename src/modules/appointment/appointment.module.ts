import { Module } from '@nestjs/common';
import { AppointmentController } from './infra/http/appointment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentService } from './services/create-appointment.service';
import { CancelAppointmentService } from './services/cancel-appointment.service';

@Module({
  controllers: [AppointmentController],
  providers: [
    PrismaService,
    CreateAppointmentService,
    CancelAppointmentService,
  ],
})
export class AppointmentModule {}
