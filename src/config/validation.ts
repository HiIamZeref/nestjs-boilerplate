import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),

  // HTTP Client
  HTTP_BASE_URL: Joi.string().default('https://api.example.com'),
  HTTP_TIMEOUT_MS: Joi.number().default(5000),
  HTTP_MAX_REDIRECTS: Joi.number().default(5),

  // Postgres (TypeORM)
  POSTGRES_HOST: Joi.string().default('localhost'),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().default('postgres'),
  POSTGRES_PASSWORD: Joi.string().default('postgres'),
  POSTGRES_DB: Joi.string().default('app'),
  POSTGRES_LOGGING: Joi.boolean().default(false),
  POSTGRES_SYNCHRONIZE: Joi.boolean().default(false),
  POSTGRES_SSL: Joi.boolean().default(false),

  // Mongo (Mongoose)
  MONGO_URI: Joi.string().optional(),
  MONGO_HOST: Joi.string().default('localhost'),
  MONGO_PORT: Joi.number().default(27017),
  MONGO_DB: Joi.string().default('app'),

  // Email
  EMAIL_HOST: Joi.string().default('localhost'),
  EMAIL_PORT: Joi.number().default(1025),
  EMAIL_USER: Joi.string().allow('').default(''),
  EMAIL_PASS: Joi.string().allow('').default(''),
  EMAIL_FROM: Joi.string().default('no-reply@example.com'),
  EMAIL_SECURE: Joi.boolean().default(false),
});
