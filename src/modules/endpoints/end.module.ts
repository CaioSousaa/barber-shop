import { Module } from '@nestjs/common';
import { EndpointUserController } from './user/infra/http/end-user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsRegistredSerice } from './user/services/clients-registred.service';
import { AppointmentEndpointController } from './appointment/infra/http/appointment-endepoint.controller';
import { AppointmenteDayDTO } from './appointment/dto/appointment-in-day-dto';
import { AppointmenteDayService } from './appointment/services/appointment-in-day.service';

@Module({
  controllers: [EndpointUserController, AppointmentEndpointController],
  providers: [
    PrismaService,
    ClientsRegistredSerice,
    AppointmenteDayDTO,
    AppointmenteDayService,
  ],
})
export class EndModule {}
