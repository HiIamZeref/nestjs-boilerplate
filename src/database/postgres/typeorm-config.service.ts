import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const postgres = this.config.get('postgres') as {
      host: string;
      port: number;
      username: string;
      password: string;
      database: string;
      logging: boolean;
      synchronize: boolean;
      ssl: boolean;
    };

    return {
      type: 'postgres' as const,
      host: postgres.host,
      port: postgres.port,
      username: postgres.username,
      password: postgres.password,
      database: postgres.database,
      logging: postgres.logging,
      synchronize: postgres.synchronize,
      ssl: postgres.ssl ? { rejectUnauthorized: false } : undefined,
      autoLoadEntities: true,
    } satisfies TypeOrmModuleOptions;
  }
}
