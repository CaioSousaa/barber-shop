import { Module } from '@nestjs/common';
import { BcryptHashPassword } from './providers/hash/implementations/bcrypt-hash-password';
import { CreateSessionUserService } from './services/create-session-user.service';
import { CreateSessionUserController } from './infra/http/authenticate.controller';
import { JwtModule } from '@nestjs/jwt';
import { secret, expiresIn } from 'src/config/jtw/config.jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendTokenRecoveryPasswordService } from './services/send-token-recovery-password.service';
import { SendEmailTokenRecoveryPasswordUserService } from '../mail/services/send-email-token-recovery-password.service';

@Module({
  imports: [
    JwtModule.register({
      secret: secret,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [CreateSessionUserController],
  providers: [
    BcryptHashPassword,
    CreateSessionUserService,
    PrismaService,
    SendEmailTokenRecoveryPasswordUserService,
    SendTokenRecoveryPasswordService,
  ],
})
export class AuthModule {}
