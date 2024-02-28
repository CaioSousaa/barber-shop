import { Module } from '@nestjs/common';
import { UserController } from './infra/http/user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserService } from './service/create-use.service';
import { ListAllUsers } from './service/list-all-users.service';
import { BctyptHash } from './providers/hash/implementations/BcryptHash';
import { SendEmailNewUser } from '../mail/services/send-email-new-user.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserService,
    BctyptHash,
    ListAllUsers,
    SendEmailNewUser,
  ],
})
export class UserModule {}
