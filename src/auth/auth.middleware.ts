import { Injectable, NestMiddleware } from '@nestjs/common';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as secret from './secret.json';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private auth: any;
  constructor() {
    this.auth = getAuth(initializeApp({
      credential: applicationDefault()
    }));
  }
  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization;
    if (token !== null && token !== '') {
      const decodedToken = await this.auth.verifyIdToken(token.replace('Bearer ', ''));
      const user = {
        email: decodedToken.email
      }
      req['user'] = user;
    }
    next();
  }
}
