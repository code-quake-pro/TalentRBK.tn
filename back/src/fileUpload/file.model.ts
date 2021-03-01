import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop()
  title: string;

  @Prop()
  path: string;

  @Prop()
  dateAdded: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
