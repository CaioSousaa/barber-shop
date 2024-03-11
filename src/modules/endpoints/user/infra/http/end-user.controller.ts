import { Controller, Get } from '@nestjs/common';
import { ClientsRegistredSerice } from '../../services/clients-registred.service';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('endpoint-user')
export class EndpointUserController {
  constructor(private readonly clientRegister: ClientsRegistredSerice) {}

  @ApiOkResponse({ status: 200, description: 'all returned clients' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to return all returned clients',
  })
  @Get('list-clients')
  public async listClients() {
    return this.clientRegister.execute();
  }
}
