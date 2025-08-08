import { CreateUserProps, UpdateUserProps, UserDomain } from './user';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
  create(data: CreateUserProps): Promise<UserDomain>;
  findAll(): Promise<UserDomain[]>;
  findById(id: string): Promise<UserDomain | null>;
  update(id: string, data: UpdateUserProps): Promise<UserDomain>;
  remove(id: string): Promise<void>;
  findByEmail(email: string): Promise<UserDomain | null>;
}
