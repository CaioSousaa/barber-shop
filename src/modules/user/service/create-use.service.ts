import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserDto } from '../dto/user-dto';
import { IHash } from '../providers/hash/contract/IHash';
import { BctyptHash } from '../providers/hash/implementations/BcryptHash';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(BctyptHash) private readonly hashPassword: IHash,
  ) {}

  async create({ name, email, password, cpf, gender }: UserDto): Promise<User> {
    try {
      const cpfInUse = await this.prisma.user.findFirst({ where: { cpf } });

      if (cpfInUse) {
        throw new ConflictException(
          'This CPF has already been registered by another user',
        );
      }

      const emailInUse = await this.prisma.user.findFirst({ where: { email } });

      if (emailInUse) {
        throw new ConflictException(
          'This email has already been registered by another user',
        );
      }

      const passwordHash: string =
        await this.hashPassword.generateHash(password);

      const createUser = await this.prisma.user.create({
        data: {
          name,
          cpf,
          gender,
          email,
          password: passwordHash,
          created_at: new Date(),
        },
      });

      return createUser;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException('Server error, please try again');
    }
  }
}
