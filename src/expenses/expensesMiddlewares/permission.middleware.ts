import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class Permission implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['permission'] === 'create' && req.method === 'POST') {
      return next();
    }
    if (req.headers['permission'] === 'read' && req.method === 'GET') {
      return next();
    }
    throw new ForbiddenException('You do not have permission');
  }
}
