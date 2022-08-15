import { Model } from 'mongoose';
import { UserInterface } from './interface/user.interface';
import { Response } from 'express';
import { UserLoginDto, UserSignupDto } from './dto/user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserInterface>);
    register(res: Response, { fullname, email, password, confirmpassword }: UserSignupDto): Promise<Response>;
    login(res: Response, { email, password }: UserLoginDto): Promise<Response>;
    protected(res: Response): Promise<Response>;
    getUsers(res: Response, { id }: {
        id: any;
    }): Promise<Response>;
    getSingleUser(res: Response, { id }: {
        id: any;
    }): Promise<Response>;
    setAvatar(res: Response, { id }: {
        id: any;
    }, { imgUrl }: {
        imgUrl: any;
    }): Promise<Response>;
    deleteUser(res: Response, { id }: {
        id: any;
    }): Promise<Response>;
}
