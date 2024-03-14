import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Appointment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CancelAppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    try {
      const appointment: Appointment = await this.prisma.appointment.findUnique(
        {
          where: {
            id: Number(id),
          },
        },
      );

      if (!appointment) {
        throw new NotFoundException('the service was never appointment');
      }

      await this.prisma.appointment.delete({
        where: {
          id: appointment.id,
        },
      });

      return;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException('Server error, please try again');
    }
  }
}
