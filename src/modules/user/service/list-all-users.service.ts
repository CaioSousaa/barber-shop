import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListAllUsers {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    try {
      const findAllUsers = await this.prisma.user.findMany();

      return findAllUsers;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException('Server error, please try again');
    }
  }
}
