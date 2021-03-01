import {
  Controller,
  Post,
  Get,
  Res,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { join } from 'path';

@Controller('/api/file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/new')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    console.log(file);
    var fs = require('fs');

    fs.rename(
      join(__dirname, '..', '..', file.path),
      join(__dirname, '..', '..', file.path + '.pdf'),
      (err) => console.log(err),
    );

    this.fileService.saveFile(file).then((result) => res.send(result));
  }

  @Get('')
  getFiles(@Res() res: Response) {
    this.fileService.getFiles().then((files: any) => {
      res.send(files);
    });
  }
}
