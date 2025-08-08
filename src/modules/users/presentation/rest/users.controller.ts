import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import {
  USERS_SERVICE,
  UsersServicePort,
} from '../../application/services/users.service.port';
import { Inject } from '@nestjs/common';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly users: UsersServicePort,
  ) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.users.create(dto);
  }

  @Get()
  findAll() {
    return this.users.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.users.remove(id);
  }
}
