import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashService {
  abstract createRandomHash(): Promise<[string, string]>;
  abstract hash(text: string | Buffer): Promise<string>;
  abstract compare(text: string | Buffer, encrypted: string): Promise<boolean>;
}
