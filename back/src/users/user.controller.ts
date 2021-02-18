import { UserDto, LoginDto } from './dto';
import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/new')
  create(@Body() body: UserDto, @Res() res: Response) {
    this.userService
      .create(body)
      .then(() => {
        res.send({ saved: true });
      })
      .catch(() => {
        res.send({ message: 'user exists', saved: false });
      });
  }

  @Post('/login')
  login(@Body() body: LoginDto, @Res() res: Response) {
    this.userService.login(body).then((result) => {
      res.send(result);
    });
  }
}
