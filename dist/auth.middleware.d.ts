import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserInterface } from './user/interface/user.interface';
import { Model } from 'mongoose';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly userModel;
    constructor(userModel: Model<UserInterface>);
    use(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
