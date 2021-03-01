import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { File, FileDocument } from './file.model';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async saveFile(file: any) {
    const { originalname, filename } = file;

    let promise = await this.fileModel.create({
      path: 'upload/' + filename + '.pdf',
      title: originalname,
      dateAdded: new Date(),
    });

    return promise;
  }

  async getFiles() {
    let files = await this.fileModel.find();

    return files;
  }
}
