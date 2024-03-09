import { RedefinePasswordDTO } from '../dto/redefine-password-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, TokenUser } from '@prisma/client';
import { SendEmailSucessRecoveryPassord } from 'src/modules/mail/services/send-email-sucess-recovery-password';
import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { isAfter } from 'date-fns';
import { compare, hash } from 'bcrypt';

@Injectable()
export class RedefinePasswordService {
  constructor(
    private readonly mail: SendEmailSucessRecoveryPassord,
    private readonly prisma: PrismaService,
  ) {}

  async execute({
    password,
    token,
    confirmPassword,
  }: RedefinePasswordDTO): Promise<User> {
    try {
      const tokenRedefinePassword: TokenUser =
        await this.prisma.tokenUser.findFirst({
          where: {
            token,
          },
        });

      if (!tokenRedefinePassword) {
        throw new NotFoundException('token does not exists in database');
      }

      const user: User = await this.prisma.user.findFirst({
        where: {
          id: tokenRedefinePassword.user_id,
        },
      });

      if (!user) {
        throw new NotFoundException(
          'this toker or user does not exists in database',
        );
      }

      const tokens: Array<TokenUser> = await this.prisma.tokenUser.findMany({
        where: {
          id: user.id,
        },
      });

      tokens.map((otherToken) => {
        if (
          !isAfter(tokenRedefinePassword.created_at, otherToken.created_at) &&
          otherToken.token != token
        ) {
          throw new UnauthorizedException('This token does not active');
        }
      });

      if (!isAfter(new Date(tokenRedefinePassword.expires_in), new Date())) {
        throw new UnauthorizedException('This token has expired');
      }

      if (
        tokenRedefinePassword.used ||
        tokenRedefinePassword.used_in !== null
      ) {
        throw new UnauthorizedException('This token was used previously');
      }

      if (password !== confirmPassword) {
        throw new NotAcceptableException(
          'passwords do not match, please try again',
        );
      }

      const newPasswordIsEqualLastPassword: boolean = await compare(
        password,
        user.password,
      );

      if (newPasswordIsEqualLastPassword) {
        throw new UnauthorizedException(
          'This new password is equal the last password, try other',
        );
      }

      const passwordHash: string = await hash(password, 8);

      const updatedUser: User = await this.prisma.user.update({
        data: { password: passwordHash },
        where: { id: user.id },
      });

      await this.prisma.tokenUser.update({
        where: {
          id: tokenRedefinePassword.id,
        },
        data: {
          used: true,
          used_in: new Date(),
        },
      });

      await this.mail.execute({ user });

      delete updatedUser.password;

      return updatedUser;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException('Server error, please try again');
    }
  }
}
