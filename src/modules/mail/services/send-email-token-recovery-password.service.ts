import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendEmailTokenRecoveryPasswordDTO } from '../dto/send-email-token-recovery-password-dto';

@Injectable()
export class SendEmailTokenRecoveryPasswordUserService {
  constructor(private readonly mailer: MailerService) {}

  async execute({ user, token }: ISendEmailTokenRecoveryPasswordDTO) {
    await this.mailer
      .sendMail({
        to: user.email,
        from: 'No reply this email please' + process.env.MAIL_USER,
        subject: `Use to chan ge your password ${token}`,
        template: './sendToken',
        context: {
          name: user.name,
          token: token,
        },
      })
      .catch((error) => {
        console.log('ERROR SEND EMAIL NEW USER: ' + error);
      });
  }
}
