import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './presentation/rest/notes.controller';
import { CreateNoteUseCase } from './application/use-cases/create-note.usecase';
import { ListNotesUseCase } from './application/use-cases/list-notes.usecase';
import { GetNoteUseCase } from './application/use-cases/get-note.usecase';
import { NOTE_REPOSITORY } from './domain/note.repository';
import { MongooseNoteRepository } from './infra/db/mongoose/note.repository';
import { NoteEntity, NoteSchema } from './infra/db/mongoose/note.schema';
import { NOTES_SERVICE } from './application/services/notes.service.port';
import { NotesService } from './application/services/notes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: NoteEntity.name, schema: NoteSchema }]),
  ],
  controllers: [NotesController],
  providers: [
    { provide: NOTE_REPOSITORY, useClass: MongooseNoteRepository },
    CreateNoteUseCase,
    ListNotesUseCase,
    GetNoteUseCase,
    { provide: NOTES_SERVICE, useClass: NotesService },
  ],
})
export class NotesModule {}
