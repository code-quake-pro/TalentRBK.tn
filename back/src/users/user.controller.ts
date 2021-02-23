import { UserDto, LoginDto } from './dto';
import { Controller, Get, Post, Body, Res, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
require('dotenv').config();

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/new')
  async create(@Body() body: UserDto, @Res() res: Response) {
    const generator = require('generate-password');
    const nodemailer = require('nodemailer');
    const saltRounds = 10;
    var obj = body;
    let salt = await bcrypt.genSalt(saltRounds);

    var password = generator.generate({
      length: 10,
      numbers: true,
    });

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rbktalents.tn@gmail.com',
        pass: process.env.EMAIL,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'rbktalents.tn@gmail.com', // sender address
      to: obj.email, // list of receivers
      subject: 'Hello, This is your account', // Subject line
      text: `email: ${obj.email}, password: ${password}`, // plain text body
    });

    console.log(info);

    let hashed = await bcrypt.hash(password, salt);
    obj['password'] = hashed;
    obj['role'] = 'company';
    this.userService
      .create(obj)
      .then(() => {
        res.send({ saved: true });
      })
      .catch((err) => {
        res.send({ message: err, saved: false });
      });
  }

  @Post('/login')
  login(@Body() body: LoginDto, @Res() res: Response) {
    this.userService.login(body).then((result) => {
      res.send(result);
    });
  }

  @Get('/')
  getAll() {
    return this.userService.getAll();
  }
}
