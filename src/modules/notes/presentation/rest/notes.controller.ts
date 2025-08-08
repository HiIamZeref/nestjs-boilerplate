import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateNoteDto } from '../../application/dto/create-note.dto';
import {
  NOTES_SERVICE,
  NotesServicePort,
} from '../../application/services/notes.service.port';

@Controller({ path: 'notes', version: '1' })
export class NotesController {
  constructor(
    @Inject(NOTES_SERVICE) private readonly notes: NotesServicePort,
  ) {}

  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.notes.create(dto);
  }

  @Get()
  findAll() {
    return this.notes.list();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notes.getById(id);
  }
}
