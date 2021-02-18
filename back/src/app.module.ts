import { UserService } from './users/user.service';
import { UserController } from './users/user.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/userModel';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
require('dotenv').config();

@Module({
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AppModule {}
