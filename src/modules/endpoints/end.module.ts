import { Module } from '@nestjs/common';
import { EndpointUserController } from './user/infra/http/end-user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsRegistredSerice } from './user/services/clients-registred.service';

@Module({
  controllers: [EndpointUserController],
  providers: [PrismaService, ClientsRegistredSerice],
})
export class EndModule {}
