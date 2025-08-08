import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDomain } from '../../domain/user';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  execute(id: string, input: UpdateUserDto): Promise<UserDomain> {
    return this.users.update(id, input);
  }
}
