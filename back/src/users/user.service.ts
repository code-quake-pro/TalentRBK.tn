import { User, UserDocument } from './userModel';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto, LoginDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUser: UserDto) {
    const saltRounds = 10;
    var obj = createUser;

    let salt = await bcrypt.genSalt(saltRounds);

    let hashed = await bcrypt.hash(obj.password, salt);

    obj.password = hashed;
    const user = new this.userModel(obj);
    let promise = await user.save();

    return promise;
  }

  async login(attempt: LoginDto) {
    if (!attempt.email || !attempt.password) return { message: 'missing data' };

    // fetching user
    let user = await this.userModel.findOne({ email: attempt.email });

    if (!user) return { message: 'user does not exist', exists: false };

    // comparing passwords
    let isValid = await bcrypt.compare(attempt.password, user.password);

    if (isValid) {
      return { user: { username: user.username, email: user.email } };
    }
    return { message: 'password is not valid', exists: true };
  }

  async getAll() {
    let users = await this.userModel.find({}, { password: false });

    return users;
  }
}
