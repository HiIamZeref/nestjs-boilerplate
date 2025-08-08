import { NoteDomain } from '../../../domain/note';
import { NoteEntity } from './note.schema';

export class NoteMapper {
  static toDomain(doc: NoteEntity): NoteDomain {
    const d = new NoteDomain();
    d.id = doc._id;
    d.title = doc.title;
    d.content = doc.content;
    return d;
  }
}
