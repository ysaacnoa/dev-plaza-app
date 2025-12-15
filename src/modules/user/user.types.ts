export type UserProfile = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  createdAt: number;
  dni?: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};
