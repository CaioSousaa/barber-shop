import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';
import { AuthModule } from './modules/authenticate/authenticate.module';
import { EnsureAuthenticateMidllwware } from './shared/http/middleware/ensure-authenticate-midlleware';

@Module({
  imports: [UserModule, MailModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EnsureAuthenticateMidllwware)
      .exclude(
        { path: '/user', method: RequestMethod.POST },
        { path: '/user/all', method: RequestMethod.GET },
        { path: '/user/:id', method: RequestMethod.DELETE },
        { path: '/authentiacte', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
