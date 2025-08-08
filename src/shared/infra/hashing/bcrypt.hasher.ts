import { HashingPort } from '../../application/ports/hashing.port';
import * as bcrypt from 'bcryptjs';

export class BcryptHasher implements HashingPort {
  private readonly saltRounds = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }

  async compare(plain: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plain, digest);
  }
}
