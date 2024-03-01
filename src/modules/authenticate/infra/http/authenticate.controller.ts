import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateSessionUserDTO } from '../../dto/create-session-user-DTO';
import { CreateSessionUserService } from '../../services/create-session-user.service';

@Controller('authentiacte')
export class CreateSessionUserController {
  constructor(
    private readonly createSessionService: CreateSessionUserService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: CreateSessionUserDTO })
  createSession(
    @Body() { cpf, password }: CreateSessionUserDTO,
  ): Promise<string> {
    return this.createSessionService.create({ cpf, password });
  }
}
