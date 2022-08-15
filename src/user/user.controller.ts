import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ImgUrlDto, UserLoginDto, UserSignupDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(
    @Body() userSignup: UserSignupDto,
    @Res() res: Response,
  ): Promise<Response> {
    return this.userService.register(res, userSignup);
  }

  @Post('login')
  login(
    @Body() userLogin: UserLoginDto,
    @Res() res: Response,
  ): Promise<Response> {
    return this.userService.login(res, userLogin);
  }

  @Get('protected')
  protected(@Res() res: Response): Promise<Response> {
    return this.userService.protected(res);
  }

  @Get('users/:id')
  getUsers(@Res() res: Response, @Param() param): Promise<Response> {
    return this.userService.getUsers(res, param);
  }

  @Get('user/:id')
  getSingleUser(@Res() res: Response, @Param() param): Promise<Response> {
    return this.userService.getSingleUser(res, param);
  }

  @Put('setavatar/:id')
  setAvatar(
    @Res() res: Response,
    @Param() param,
    @Body() imgUrl: ImgUrlDto,
  ): Promise<Response> {
    return this.userService.setAvatar(res, param, imgUrl);
  }

  @Delete('delete/:id')
  deleteUser(@Res() res: Response, @Param() param): Promise<Response> {
    return this.userService.deleteUser(res, param);
  }
}
