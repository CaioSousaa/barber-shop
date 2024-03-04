import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeleteUserService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: string) {
    try {
      const userExist = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      if (!userExist) {
        throw new NotAcceptableException('user does not exist!!!');
      }

      await this.prisma.user.delete({
        where: {
          id: userExist.id,
        },
      });

      return;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException('Server error, please try again');
    }
  }
}
