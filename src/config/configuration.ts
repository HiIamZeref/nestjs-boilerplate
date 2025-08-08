export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  http: {
    baseURL: process.env.HTTP_BASE_URL ?? 'https://api.example.com',
    timeoutMs: parseInt(process.env.HTTP_TIMEOUT_MS ?? '5000', 10),
    maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS ?? '5', 10),
  },
  email: {
    host: process.env.EMAIL_HOST ?? 'localhost',
    port: parseInt(process.env.EMAIL_PORT ?? '1025', 10),
    user: process.env.EMAIL_USER ?? '',
    pass: process.env.EMAIL_PASS ?? '',
    from: process.env.EMAIL_FROM ?? 'no-reply@example.com',
    secure: (process.env.EMAIL_SECURE ?? 'false') === 'true',
  },
  postgres: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: process.env.POSTGRES_DB ?? 'app',
    logging: (process.env.POSTGRES_LOGGING ?? 'false') === 'true',
    synchronize: (process.env.POSTGRES_SYNCHRONIZE ?? 'false') === 'true',
    ssl: (process.env.POSTGRES_SSL ?? 'false') === 'true',
  },
  mongo: {
    uri:
      process.env.MONGO_URI ??
      `mongodb://${process.env.MONGO_HOST ?? 'localhost'}:${
        process.env.MONGO_PORT ?? '27017'
      }/${process.env.MONGO_DB ?? 'app'}`,
  },
});
