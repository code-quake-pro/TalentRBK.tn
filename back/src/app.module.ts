import { UserService } from './users/user.service';
import { FileService } from './fileUpload/file.service';
import { UserController } from './users/user.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/user.model';
import { File, FileSchema } from './fileUpload/file.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { FileController } from './fileUpload/file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
require('dotenv').config();

@Module({
  controllers: [UserController, FileController],
  providers: [UserService, FileService],
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: File.name, schema: FileSchema },
    ]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    MulterModule.register({
      dest: './build/upload',
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'build') }),
  ],
})
export class AppModule {}
