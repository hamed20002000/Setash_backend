import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  /**
   * Generate a secure random token (64 hex characters, 256-bit entropy)
   */
  generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
