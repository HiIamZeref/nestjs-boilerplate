import { Inject, Injectable } from '@nestjs/common';
import { NOTE_REPOSITORY, NoteRepository } from '../../domain/note.repository';
import { CreateNoteDto } from '../dto/create-note.dto';
import { NoteDomain } from '../../domain/note';

@Injectable()
export class CreateNoteUseCase {
  constructor(
    @Inject(NOTE_REPOSITORY) private readonly notes: NoteRepository,
  ) {}

  execute(input: CreateNoteDto): Promise<NoteDomain> {
    return this.notes.create({ title: input.title, content: input.content });
  }
}
