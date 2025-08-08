import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteRepository } from '../../../domain/note.repository';
import { CreateNoteProps, NoteDomain } from '../../../domain/note';
import { NoteEntity } from './note.schema';
import { NoteMapper } from './note.mapper';

export class MongooseNoteRepository implements NoteRepository {
  constructor(
    @InjectModel(NoteEntity.name)
    private readonly noteModel: Model<NoteEntity>,
  ) {}

  async create(data: CreateNoteProps): Promise<NoteDomain> {
    const created = await this.noteModel.create(data);
    return NoteMapper.toDomain(created);
  }

  async findAll(): Promise<NoteDomain[]> {
    const rows = await this.noteModel.find().lean();
    return rows.map((row) => NoteMapper.toDomain(row));
  }

  async findById(id: string): Promise<NoteDomain | null> {
    const row = await this.noteModel.findById(id).lean();
    return row ? NoteMapper.toDomain(row) : null;
  }
}
