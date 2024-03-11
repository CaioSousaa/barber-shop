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
import { EndModule } from './modules/endpoints/end.module';

@Module({
  imports: [UserModule, MailModule, AuthModule, EndModule],
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
        { path: '/endpoint-user/list-clients', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
