import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';
import { AuthModule } from './modules/authenticate/authenticate.module';

@Module({
  imports: [UserModule, MailModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
