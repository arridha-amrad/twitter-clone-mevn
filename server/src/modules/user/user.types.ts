import { User } from "@prisma/client";

export type RegisterDTO = Pick<User, "email" | "username" | "password"> & {
  firstName: string;
  lastName: string;
};
