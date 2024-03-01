import { Injectable } from '@nestjs/common';
import { IHash } from '../contract/IHash';
import { hash } from 'bcrypt';

@Injectable()
export class BcryptHash implements IHash {
  generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}
