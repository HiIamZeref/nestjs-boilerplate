import { CreateNoteProps, NoteDomain } from './note';

export const NOTE_REPOSITORY = Symbol('NOTE_REPOSITORY');

export interface NoteRepository {
  create(data: CreateNoteProps): Promise<NoteDomain>;
  findAll(): Promise<NoteDomain[]>;
  findById(id: string): Promise<NoteDomain | null>;
}
