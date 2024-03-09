import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendEmailNewUser } from './services/send-email-new-user.service';
import { SendTokenRecoveryPasswordDTO } from '../authenticate/dto/send-token-recovery-password-dto';
import { SendEmailSucessRecoveryPassord } from './services/send-email-sucess-recovery-password';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
  ],
  providers: [
    SendEmailNewUser,
    SendTokenRecoveryPasswordDTO,
    SendEmailSucessRecoveryPassord,
  ],
  exports: [
    SendEmailNewUser,
    SendTokenRecoveryPasswordDTO,
    SendEmailSucessRecoveryPassord,
  ],
})
export class MailModule {}
