import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UpdatUserDTO } from '../dto/update-user-dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UpdateUserService {
  constructor(private readonly prisma: PrismaService) {}
  async update(id: string, { name, email, cpf }: UpdatUserDTO): Promise<User> {
    try {
      const user: User = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException('User does not exist');
      }

      if (email && user.email != email) {
        const emailInUse = await this.prisma.user.findFirst({
          where: { email },
        });

        if (emailInUse) {
          throw new NotAcceptableException('email in use by another user');
        }
      }

      if (cpf && user.cpf != cpf) {
        const cpfInUse = await this.prisma.user.findUnique({
          where: { cpf },
        });

        if (cpfInUse) {
          throw new NotAcceptableException('cpf in use by another user');
        }
      }

      const updateUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          cpf,
        },
      });

      return updateUser;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException('Server error, please try again');
    }
  }
}
