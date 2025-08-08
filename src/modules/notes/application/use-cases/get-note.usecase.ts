import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NOTE_REPOSITORY, NoteRepository } from '../../domain/note.repository';
import { NoteDomain } from '../../domain/note';

@Injectable()
export class GetNoteUseCase {
  constructor(
    @Inject(NOTE_REPOSITORY) private readonly notes: NoteRepository,
  ) {}

  async execute(id: string): Promise<NoteDomain> {
    const note = await this.notes.findById(id);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }
}
