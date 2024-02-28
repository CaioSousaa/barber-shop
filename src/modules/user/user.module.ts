import { Module } from '@nestjs/common';
import { UserController } from './infra/http/user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserService } from './service/create-use.service';
import { ListAllUsers } from './service/list-all-users.service';
import { BctyptHash } from './providers/hash/implementations/BcryptHash';

@Module({
  controllers: [UserController],
  providers: [PrismaService, CreateUserService, BctyptHash, ListAllUsers],
})
export class UserModule {}