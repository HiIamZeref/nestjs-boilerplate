export const HASHING_SERVICE = Symbol('HASHING_SERVICE');

export interface HashingPort {
  hash(plain: string): Promise<string>;
  compare(plain: string, digest: string): Promise<boolean>;
}
