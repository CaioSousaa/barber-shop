import { Module } from '@nestjs/common';
import { UserController } from './infra/http/user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserService } from './service/create-user.service';
import { ListAllUsers } from './service/list-all-users.service';
import { BcryptHash } from './providers/hash/implementations/BcryptHash';
import { SendEmailNewUser } from '../mail/services/send-email-new-user.service';
import { DeleteUserService } from './service/delete-user.service';
import { UpdateUserService } from './service/update-user.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    CreateUserService,
    BcryptHash,
    ListAllUsers,
    SendEmailNewUser,
    DeleteUserService,
    UpdateUserService,
  ],
})
export class UserModule {}
