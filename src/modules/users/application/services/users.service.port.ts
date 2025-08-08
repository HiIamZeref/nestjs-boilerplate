import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const USERS_SERVICE = Symbol('USERS_SERVICE');

export interface UsersServicePort {
  create(dto: CreateUserDto): Promise<unknown>;
  list(): Promise<unknown[]>;
  getById(id: string): Promise<unknown>;
  update(id: string, dto: UpdateUserDto): Promise<unknown>;
  remove(id: string): Promise<void>;
}
