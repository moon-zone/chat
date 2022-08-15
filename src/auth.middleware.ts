import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from './user/interface/user.interface';
import { Model } from 'mongoose';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    let token: any;

    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if (!token) return res.status(400).json('Not authorised');

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);

      const user = await this.userModel
        .findById(decoded.id)
        .select('-password');

      if (!user) return res.status(404).json('Not found');

      res.locals.user = user;
      next();
    } catch (err) {
      return res.status(401).json('Unauthorized');
    }
  }
}
