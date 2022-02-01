import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private auth: any;
  constructor() {
    this.auth = getAuth(initializeApp({
      credential: applicationDefault()
    }));
  }
  async use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token !== null && token !== '') {
      try {
        const decodedToken = await this.auth.verifyIdToken(token.replace('Bearer ', ''));
        const user: any = {
          email: decodedToken.email
        }
        req.user = user;
      } catch (e) {
        console.error(e);
        res.status(403).json({
          statusCode: 403,
          timestamp: new Date().toISOString(),
          path: req.url,
          message: 'Access Denied.',
        })
      }
    }
    next();
  }
}
