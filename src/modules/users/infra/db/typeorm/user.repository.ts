import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/user.repository';
import {
  CreateUserProps,
  UpdateUserProps,
  UserDomain,
} from '../../../domain/user';
import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';

export class TypeormUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserProps): Promise<UserDomain> {
    const entity = this.repo.create(data);
    const saved = await this.repo.save(entity);
    return UserMapper.toDomain(saved);
  }

  async findAll(): Promise<UserDomain[]> {
    const rows = await this.repo.find();
    return rows.map((row) => UserMapper.toDomain(row));
  }

  async findById(id: string): Promise<UserDomain | null> {
    const row = await this.repo.findOne({ where: { id } });
    return row ? UserMapper.toDomain(row) : null;
  }

  async update(id: string, data: UpdateUserProps): Promise<UserDomain> {
    await this.repo.update({ id }, data);
    const updated = await this.repo.findOneOrFail({ where: { id } });
    return UserMapper.toDomain(updated);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findByEmail(email: string): Promise<UserDomain | null> {
    const row = await this.repo.findOne({ where: { email } });
    return row ? UserMapper.toDomain(row) : null;
  }
}
