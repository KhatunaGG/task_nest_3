import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UserAgent implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['user-agent'].includes('Mobile')) {
      throw new BadRequestException('Access Denied');
    } else {
      next();
    }
  }
}
