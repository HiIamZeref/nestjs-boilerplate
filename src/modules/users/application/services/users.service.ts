import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user.usecase';
import { ListUsersUseCase } from '../use-cases/list-users.usecase';
import { GetUserUseCase } from '../use-cases/get-user.usecase';
import { UpdateUserUseCase } from '../use-cases/update-user.usecase';
import { RemoveUserUseCase } from '../use-cases/remove-user.usecase';
import { UsersServicePort } from './users.service.port';

@Injectable()
export class UsersService implements UsersServicePort {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly removeUser: RemoveUserUseCase,
  ) {}

  create(dto: CreateUserDto) {
    return this.createUser.execute(dto);
  }

  list() {
    return this.listUsers.execute();
  }

  getById(id: string) {
    return this.getUser.execute(id);
  }

  update(id: string, dto: UpdateUserDto) {
    return this.updateUser.execute(id, dto);
  }

  remove(id: string) {
    return this.removeUser.execute(id);
  }
}
