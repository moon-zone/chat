import { Response } from 'express';
import { ImgUrlDto, UserLoginDto, UserSignupDto } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(userSignup: UserSignupDto, res: Response): Promise<Response>;
    login(userLogin: UserLoginDto, res: Response): Promise<Response>;
    protected(res: Response): Promise<Response>;
    getUsers(res: Response, param: any): Promise<Response>;
    getSingleUser(res: Response, param: any): Promise<Response>;
    setAvatar(res: Response, param: any, imgUrl: ImgUrlDto): Promise<Response>;
    deleteUser(res: Response, param: any): Promise<Response>;
}
