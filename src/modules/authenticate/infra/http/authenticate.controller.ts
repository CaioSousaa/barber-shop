import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateSessionUserDTO } from '../../dto/create-session-user-DTO';
import { CreateSessionUserService } from '../../services/create-session-user.service';
import { SendTokenRecoveryPasswordDTO } from '../../dto/send-token-recovery-password-dto';
import { SendTokenRecoveryPasswordService } from '../../services/send-token-recovery-password.service';

@Controller('authentiacte')
export class CreateSessionUserController {
  constructor(
    private readonly createSessionService: CreateSessionUserService,
    private readonly sendTokenRecoveryPassword: SendTokenRecoveryPasswordService,
  ) {}

  @ApiOkResponse({ status: 201, description: 'The session has been created' })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The session has not created, credentials failed',
  })
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: CreateSessionUserDTO })
  public async createSession(
    @Body() { cpf, password }: CreateSessionUserDTO,
  ): Promise<string> {
    return this.createSessionService.create({ cpf, password });
  }

  @ApiOkResponse({
    status: 201,
    description: 'The e-mail with token has been sended',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The e-mail cannot be sended',
  })
  @Post('send-token')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: SendTokenRecoveryPasswordDTO })
  public async sendToken(@Body() { email }: SendTokenRecoveryPasswordDTO) {
    return this.sendTokenRecoveryPassword.execute({ email });
  }
}
