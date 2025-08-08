import { CreateNoteDto } from '../dto/create-note.dto';

export const NOTES_SERVICE = Symbol('NOTES_SERVICE');

export interface NotesServicePort {
  create(dto: CreateNoteDto): Promise<unknown>;
  list(): Promise<unknown[]>;
  getById(id: string): Promise<unknown>;
}
