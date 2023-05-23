import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as jwt from 'jose';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  async use(
    req: Request & { user?: { id: string; name: string } },
    res: Response,
    next: () => void,
  ) {
    const token = req.headers?.authorization;
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const { payload } = await jwt.jwtVerify(
        token,
        new TextEncoder().encode(this.configService.get('JWT_SECRET')),
      );
      req.user = {
        name: `${payload.name}`,
        id: `${payload.id}`,
      };
      next();
    } catch (error) {
      return res.status(401).send({ message: 'Invalid token' });
    }
  }
}
