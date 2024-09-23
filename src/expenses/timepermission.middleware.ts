import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class Timepermission implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentHour = new Date().getHours();
    console.log(currentHour, 'currentHour');
    if (currentHour >= 10 && currentHour < 22) {
      next();
    } else {
      return res.status(403).json({
        message: 'Access is allowed only between 10:00 and 22:00',
      });
    }
  }
}
