import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '../../dto/user-dto';
import { CreateUserService } from '../../service/create-use.service';
import { ListAllUsers } from '../../service/list-all-users.service';
import { User } from '@prisma/client';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: CreateUserService,
    private readonly listAll: ListAllUsers,
  ) {}

  @ApiOkResponse({ status: 201, description: 'The register has been created' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The register has not created',
  })
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: UserDto })
  public async create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  @ApiOkResponse({ status: 201, description: 'The register has been created' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The register has not created',
  })
  @Get('all')
  public async findAll() {
    return this.listAll.findAll();
  }
}
