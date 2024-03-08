import { addDays } from 'date-fns';
import { SendEmailTokenRecoveryPasswordUserService } from 'src/modules/mail/services/send-email-token-recovery-password.service';
import { SendTokenRecoveryPasswordDTO } from '../dto/send-token-recovery-password-dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TokenUser, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SendTokenRecoveryPasswordService {
  constructor(
    private readonly mail: SendEmailTokenRecoveryPasswordUserService,
    private readonly prisma: PrismaService,
  ) {}

  async execute({ email }: SendTokenRecoveryPasswordDTO) {
    try {
      const user: User = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new NotFoundException('User does not exist');
      }

      const lastToken: TokenUser = await this.prisma.tokenUser.findFirst({
        where: { user_id: user.id },
        orderBy: { created_at: 'desc' },
      });

      if (lastToken && !lastToken.used && lastToken.expires_in === null) {
        await this.mail.execute({
          user,
          token: lastToken.token,
        });

        return lastToken;
      } else {
        const expires_in: Date = addDays(new Date(), 7);

        const token: TokenUser = await this.prisma.tokenUser.create({
          data: {
            user_id: user.id,
            expires_in,
          },
        });

        await this.mail.execute({
          user,
          token: token.token,
        });

        return token;
      }
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException('Server error, please try again');
    }
  }
}
