import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  async hash(payload: string) {
    return hash(payload, 10)
  }

  async compareHash(payload: string, toCompare: string) {
    return compare(payload, toCompare)
  }
}
