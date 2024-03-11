import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientsRegistredSerice {
  constructor(private readonly prisma: PrismaService) {}

  async execute() {
    try {
      const clients = await this.prisma.user.groupBy({
        by: ['name', 'cpf'],
      });

      const countUsers = await this.prisma.user.count({});

      return {
        clients: clients.map((item) => ({
          name: item.name,
          cpf: item.cpf,
        })),
        totalUsers: countUsers,
      };
    } catch (error) {
      if (error) throw error;
      return new InternalServerErrorException('Server error, please try again');
    }
  }
}
