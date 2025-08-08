import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserProps, UserDomain } from '../../domain/user';
import {
  HASHING_SERVICE,
  HashingPort,
} from '../../../../shared/application/ports/hashing.port';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(HASHING_SERVICE) private readonly hasher: HashingPort,
  ) {}

  async execute(input: CreateUserDto): Promise<UserDomain> {
    const exists = await this.users.findByEmail(input.email);
    if (exists) throw new BadRequestException('E-mail já em uso');

    const data: CreateUserProps = {
      email: input.email,
      name: input.name,
      passwordHash: await this.hasher.hash(input.password),
    };
    return this.users.create(data);
  }
}
