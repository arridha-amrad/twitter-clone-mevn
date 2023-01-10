export type User = {
  id: string;
  username: string;
  email: string;
  imageURL: string;
};

export type RegisterDTO = {
  username: string;
  email: string;
  password: string;
};

export type LoginDTO = {
  identity: string;
  password: string;
};
