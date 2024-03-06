import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendEmailNewUser } from './services/send-email-new-user.service';
import { SendTokenRecoveryPasswordDTO } from '../authenticate/dto/send-token-recovery-password-dto';

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
  providers: [SendEmailNewUser, SendTokenRecoveryPasswordDTO],
  exports: [SendEmailNewUser, SendTokenRecoveryPasswordDTO],
})
export class MailModule {}
