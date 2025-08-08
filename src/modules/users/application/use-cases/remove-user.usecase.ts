import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/user.repository';

@Injectable()
export class RemoveUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  execute(id: string): Promise<void> {
    return this.users.remove(id);
  }
}
