import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateSessionUserDTO } from '../dto/create-session-user-DTO';
import { IHashPasswordContract } from '../providers/hash/contract/IHash-password-contract';
import { BcryptHashPassword } from '../providers/hash/implementations/bcrypt-hash-password';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CreateSessionUserService {
  constructor(
    @Inject(BcryptHashPassword)
    private readonly hashPassword: IHashPasswordContract,
    private jtwService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async create({ cpf, password }: CreateSessionUserDTO): Promise<string> {
    try {
      const user = await this.prisma.user.findUnique({ where: { cpf } });

      if (!user) {
        throw new NotFoundException('this cpf or password incorrect');
      }

      const verifyCombineUserPassword: boolean =
        await this.hashPassword.compareHash(password, user.password);

      if (!verifyCombineUserPassword) {
        throw new UnauthorizedException(
          'the password passed does not match the user',
        );
      }
      return this.jtwService.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException('Server error, please try again');
    }
  }
}
