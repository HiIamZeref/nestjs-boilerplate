import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './presentation/rest/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { ListUsersUseCase } from './application/use-cases/list-users.usecase';
import { GetUserUseCase } from './application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { RemoveUserUseCase } from './application/use-cases/remove-user.usecase';
import { USER_REPOSITORY } from './domain/user.repository';
import { TypeormUserRepository } from './infra/db/typeorm/user.repository';
import { UserEntity } from './infra/db/typeorm/user.entity';
import { UsersService } from './application/services/users.service';
import { USERS_SERVICE } from './application/services/users.service.port';
import { SharedProvidersModule } from '../../shared/shared-providers.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedProvidersModule],
  controllers: [UsersController],
  providers: [
    { provide: USER_REPOSITORY, useClass: TypeormUserRepository },
    CreateUserUseCase,
    ListUsersUseCase,
    GetUserUseCase,
    UpdateUserUseCase,
    RemoveUserUseCase,
    { provide: USERS_SERVICE, useClass: UsersService },
  ],
})
export class UsersModule {}
