import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NoteDocument = HydratedDocument<NoteEntity>;

@Schema({ timestamps: true })
export class NoteEntity {
  @Prop({
    _id: true,
    type: String,
    required: false,
    default: () => new Types.ObjectId().toHexString(),
  })
  _id!: string;

  @Prop({ required: true })
  title!: string;

  @Prop()
  content?: string;
}

export const NoteSchema = SchemaFactory.createForClass(NoteEntity);
