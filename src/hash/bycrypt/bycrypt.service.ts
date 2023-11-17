import { Injectable } from '@nestjs/common';
import { HashService } from '../hash.service';
import { genSalt, hash, compare } from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class BycryptService implements HashService {
  async hash(text: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(text, salt);
  }
  compare(text: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(text, encrypted);
  }
  async createRandomHash(): Promise<[string, string]> {
    const token = randomBytes(32).toString('hex');

    const hashsedToken = await this.hash(token);

    return [token, hashsedToken];
  }
}
