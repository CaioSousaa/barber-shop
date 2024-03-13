import { Module } from '@nestjs/common';
import { AppointmentController } from './infra/http/appointment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentService } from './services/create-appointment.service';

@Module({
  controllers: [AppointmentController],
  providers: [PrismaService, CreateAppointmentService],
})
export class AppointmentModule {}
