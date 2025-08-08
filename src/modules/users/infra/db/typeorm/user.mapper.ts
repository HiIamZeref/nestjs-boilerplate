import { UserEntity } from './user.entity';
import { UserDomain } from '../../../domain/user';

export class UserMapper {
  static toDomain(entity: UserEntity): UserDomain {
    const domain = new UserDomain();
    domain.id = entity.id;
    domain.email = entity.email;
    domain.name = entity.name;
    domain.passwordHash = entity.passwordHash;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    return domain;
  }
}
