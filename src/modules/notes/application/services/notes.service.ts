import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { CreateNoteUseCase } from '../use-cases/create-note.usecase';
import { ListNotesUseCase } from '../use-cases/list-notes.usecase';
import { GetNoteUseCase } from '../use-cases/get-note.usecase';
import { NotesServicePort } from './notes.service.port';

@Injectable()
export class NotesService implements NotesServicePort {
  constructor(
    private readonly createNote: CreateNoteUseCase,
    private readonly listNotes: ListNotesUseCase,
    private readonly getNote: GetNoteUseCase,
  ) {}

  create(dto: CreateNoteDto) {
    return this.createNote.execute(dto);
  }

  list() {
    return this.listNotes.execute();
  }

  getById(id: string) {
    return this.getNote.execute(id);
  }
}
