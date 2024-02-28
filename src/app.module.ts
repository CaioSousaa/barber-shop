import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [UserModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
