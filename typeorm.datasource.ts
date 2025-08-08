import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';

const host = process.env.POSTGRES_HOST ?? 'localhost';
const port = parseInt(process.env.POSTGRES_PORT ?? '5432', 10);
const username = process.env.POSTGRES_USER ?? 'postgres';
const password = process.env.POSTGRES_PASSWORD ?? 'postgres';
const database = process.env.POSTGRES_DB ?? 'app';
const logging = (process.env.POSTGRES_LOGGING ?? 'false') === 'true';
const ssl = (process.env.POSTGRES_SSL ?? 'false') === 'true';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  logging,
  ssl: ssl ? { rejectUnauthorized: false } : undefined,
  entities: ['src/database/postgres/entities/**/*.ts'],
  migrations: ['src/database/postgres/migrations/**/*.ts'],
});

export default AppDataSource;
