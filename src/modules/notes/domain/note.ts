export class NoteDomain {
  id!: string;
  title!: string;
  content?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export type CreateNoteProps = {
  title: string;
  content?: string;
};
