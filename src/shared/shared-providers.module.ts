import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HASHING_SERVICE } from './application/ports/hashing.port';
import { EMAIL_SENDER } from './application/ports/email.port';
import { BcryptHasher } from './infra/hashing/bcrypt.hasher';
import { NodemailerEmail } from './infra/email/nodemailer.email';

@Module({
  imports: [ConfigModule],
  providers: [
    { provide: HASHING_SERVICE, useClass: BcryptHasher },
    {
      provide: EMAIL_SENDER,
      useFactory: (config: ConfigService) => new NodemailerEmail(config),
      inject: [ConfigService],
    },
  ],
  exports: [HASHING_SERVICE, EMAIL_SENDER],
})
export class SharedProvidersModule {}
