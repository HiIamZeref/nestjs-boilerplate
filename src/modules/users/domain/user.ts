export class UserDomain {
  id!: string;
  email!: string;
  name!: string;
  passwordHash!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export type CreateUserProps = {
  email: string;
  name: string;
  passwordHash: string;
};

export type UpdateUserProps = {
  name?: string;
};
