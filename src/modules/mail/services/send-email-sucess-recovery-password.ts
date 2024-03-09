import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendEmailNewUserDTO } from '../dto/ISend-emai-new-user-dto';

@Injectable()
export class SendEmailSucessRecoveryPassord {
  constructor(private readonly mailer: MailerService) {}

  async execute({ user }: ISendEmailNewUserDTO) {
    await this.mailer
      .sendMail({
        to: user.email,
        from: 'No reply this email please' + process.env.MAIL_USER,
        subject: 'password changed successfully',
        template: 'confirm',
        context: {
          name: user.name,
        },
      })
      .catch((error) => {
        console.log('ERROR SEND EMAIL NEW USER: ' + error);
      });
  }
}
