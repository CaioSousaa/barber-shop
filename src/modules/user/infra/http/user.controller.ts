import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
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
import { UserDTO } from '../../dto/user-dto';
import { CreateUserService } from '../../service/create-use.service';
import { ListAllUsers } from '../../service/list-all-users.service';
import { DeleteUserService } from '../../service/delete-user.service';
import { User } from '@prisma/client';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: CreateUserService,
    private readonly listAll: ListAllUsers,
    private readonly deleteUser: DeleteUserService,
  ) {}

  @ApiOkResponse({ status: 201, description: 'The user has been created' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user has not created',
  })
  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBody({ type: UserDTO })
  public async create(@Body() userDTO: UserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  @ApiOkResponse({ status: 200, description: 'all returned customers' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to return all returned customers',
  })
  @Get('all')
  public async findAll() {
    return this.listAll.findAll();
  }

  @ApiOkResponse({ status: 200, description: 'client deleted with success' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to delete client',
  })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }
}
