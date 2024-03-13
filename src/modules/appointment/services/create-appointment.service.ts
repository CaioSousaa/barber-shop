import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDTO } from '../dto/create-appointment-dto';
import { calculateValue } from 'src/utils/functions/calculate-value';
import { getFutureHours } from 'src/utils/functions/get-future-hour';
import { notPermittedHours } from 'src/utils/functions/not-permitted-hours';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Appointment, User } from '@prisma/client';
import { isWithinInterval, parseISO } from 'date-fns';

@Injectable()
export class CreateAppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    userId,
    startAt,
    payment,
    cut,
    dye_hair,
    eyebrows,
    endAt,
  }: CreateAppointmentDTO): Promise<Appointment> {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException('this user does not exists');
      }

      const invalidDayAppointment: Appointment =
        await this.prisma.appointment.findFirst({
          where: { startAt },
        });

      if (invalidDayAppointment) {
        throw new ConflictException(
          'There is already a appointment for this time',
        );
      }

      const invalidHour = notPermittedHours(String(startAt));

      if (invalidHour === null) {
        throw new NotAcceptableException('the establishment is closed');
      }

      payment = calculateValue(cut, dye_hair, eyebrows);

      endAt = getFutureHours(String(startAt));

      const allAppointments = await this.prisma.appointment.findMany();

      for (const appointment of allAppointments) {
        if (
          isWithinInterval(parseISO(String(startAt)), {
            start: appointment.startAt,
            end: appointment.endAt,
          }) ||
          isWithinInterval(parseISO(String(endAt)), {
            start: appointment.startAt,
            end: appointment.endAt,
          })
        ) {
          throw new ConflictException(
            'This appointment conflicts with an existing appointment',
          );
        }
      }

      const createUser = await this.prisma.appointment.create({
        data: {
          userId: user.id,
          payment: payment,
          cut,
          startAt,
          eyebrows,
          dye_hair,
          endAt: endAt,
        },
      });

      return createUser;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException('Server error, please try again');
    }
  }
}
