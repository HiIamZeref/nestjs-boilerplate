### NestJS Boilerplate (Clean Architecture + Multi-DB)

Este boilerplate demonstra uma arquitetura escalável em NestJS, usando Clean Architecture por módulo (vertical slice) e exemplos de múltiplos bancos (Postgres + Mongo), além de integrações externas via providers.

### Tecnologias

- NestJS 11
- TypeORM (Postgres)
- Mongoose (MongoDB)
- Axios (HttpModule)
- @nestjs/config + Joi (validação de env)
- @nestjs/terminus (health)
- Helmet, CORS, ValidationPipe (segurança e DX)
- Dockerfile + docker-compose

### Estrutura de diretórios (essencial)

```
src/
  app.module.ts
  config/
    configuration.ts         # leitura centralizada de env
    validation.ts            # schema Joi
  health/
    health.module.ts
    health.controller.ts
  modules/
    users/
      domain/                # entidades e portas (interfaces) puras
        user.ts
        user.repository.ts
      application/           # casos de uso, DTOs, serviços de orquestração
        dto/
          create-user.dto.ts
          update-user.dto.ts
        services/
          users.service.port.ts
          users.service.ts
        use-cases/
          create-user.usecase.ts
          list-users.usecase.ts
          get-user.usecase.ts
          update-user.usecase.ts
          remove-user.usecase.ts
      infra/                 # adapters para DB/HTTP/etc.
        db/
          typeorm/
            user.entity.ts
            user.mapper.ts
            user.repository.ts
      interface/
        rest/
          users.controller.ts
      users.module.ts

    notes/                   # mesmo padrão (com Mongoose)
      domain/
      application/
        dto/
        services/
        use-cases/
      infra/
        db/
          mongoose/
            note.schema.ts
            note.mapper.ts
            note.repository.ts
      interface/
        rest/
          notes.controller.ts
      notes.module.ts

  shared/                    # providers transversais (ports/adapters)
    application/ports/
      hashing.port.ts
      email.port.ts
    infra/
      hashing/bcrypt.hasher.ts
      email/nodemailer.email.ts
    shared-providers.module.ts

typeorm.datasource.ts        # CLI TypeORM (migrations)
```

### Clean Architecture (resumo)

- **domain**: regras de negócio puras (sem Nest/ORM). Define portas (interfaces) como contratos.
- **application**: casos de uso e serviços de orquestração. Dependem de portas, não de implementações.
- **infra**: adapters que implementam portas (TypeORM, Mongoose, HTTP, SDKs, etc.). Mappers fazem a tradução domain ↔ persistência.
- **interface**: controladores REST. Tratam requests/responses e chamam o serviço de aplicação.

Os bindings de DI (Dependency Injection) ficam nos módulos: cada porta recebe uma implementação via token (Symbol), ex.: `{ provide: HASHING_SERVICE, useClass: BcryptHasher }`.

### Variáveis de Ambiente

Crie um `.env` na raiz:

```
NODE_ENV=development
PORT=3000

# HTTP Client
HTTP_BASE_URL=https://api.example.com
HTTP_TIMEOUT_MS=5000
HTTP_MAX_REDIRECTS=5

# Postgres
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=app
POSTGRES_LOGGING=false
POSTGRES_SYNCHRONIZE=false
POSTGRES_SSL=false

# Mongo
MONGO_URI=mongodb://mongo:27017/app

# Email
EMAIL_HOST=localhost
EMAIL_PORT=1025
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=no-reply@example.com
EMAIL_SECURE=false
```

### Scripts

- `npm run start:dev` – dev com watch
- `npm run build` – compila TypeScript
- `npm run migration:generate` – gera migrations TypeORM
- `npm run migration:run` – executa migrations
- `npm run migration:revert` – reverte migrations

### Docker

Suba a stack completa (API + Postgres + Mongo):

```
docker compose up --build
```

A API inicia em `http://localhost:3000`.

### Endpoints de exemplo

- `GET /api/v1/health` – healthcheck Postgres + Mongo
- `POST /api/v1/users` – cria usuário (Postgres)
- `GET /api/v1/users` – lista usuários
- `POST /api/v1/notes` – cria nota (Mongo)
- `GET /api/v1/notes` – lista notas

### Como adicionar um novo módulo

1. Domain: entidade(s) e portas em `modules/<modulo>/domain`.
2. Application: DTOs, casos de uso e serviço orquestrador (porta + impl).
3. Infra: adapters (ORM/HTTP/SDK) que implementam as portas, com mappers.
4. Interface: controller REST que injeta a porta do serviço de aplicação.
5. Módulo: bind das portas → implementações, import de ORM/Mongoose.
6. Se precisar de providers transversais, adicione portas/impls em `shared/` e exporte no `SharedProvidersModule`.

### Decisões de arquitetura

- Portas/Adapters com tokens (Symbols) para DI em runtime e baixo acoplamento.
- Um serviço de aplicação por módulo para orquestrar use cases e manter controllers enxutos.
- Multi-DB: Postgres (TypeORM, autoLoadEntities) e Mongo (Mongoose) no mesmo app.
- Config/validation centralizados para segurança e previsibilidade.

### Testes (sugestão)

- Domain: unit puro.
- Use cases: unit mockando portas.
- Infra (repos/gateways): integração fina com DB/externos.
- Controllers: e2e conforme necessidade.

### Licença

MIT
