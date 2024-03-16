import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmenteDayDTO } from '../dto/appointment-in-day-dto';
import { Appointment } from '@prisma/client';
import { isSameDay } from 'date-fns';

@Injectable()
export class AppointmenteDayService {
  constructor(private readonly prisma: PrismaService) {}

  async execute({ date }: AppointmenteDayDTO): Promise<{
    appointments: Appointment[];
    totalProfit: number;
  }> {
    try {
      const allAppointments = await this.prisma.appointment.findMany({
        where: {
          AND: [
            { startAt: { gte: new Date(date) } },
            {
              startAt: {
                lt: new Date(new Date(date).getTime()),
              },
            },
          ],
        },
      });

      const appointments: Appointment[] = [];
      let totalProfit = 0;

      for (const appointment of allAppointments) {
        if (isSameDay(new Date(date), appointment.startAt)) {
          appointments.push(appointment);
          totalProfit += appointment.payment;
        }
      }

      return { appointments, totalProfit };
    } catch (error) {
      throw new InternalServerErrorException('Server error, please try again');
    }
  }
}
