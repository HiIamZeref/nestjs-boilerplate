import { Inject, Injectable } from '@nestjs/common';
import { NOTE_REPOSITORY, NoteRepository } from '../../domain/note.repository';
import { NoteDomain } from '../../domain/note';

@Injectable()
export class ListNotesUseCase {
  constructor(
    @Inject(NOTE_REPOSITORY) private readonly notes: NoteRepository,
  ) {}

  execute(): Promise<NoteDomain[]> {
    return this.notes.findAll();
  }
}
