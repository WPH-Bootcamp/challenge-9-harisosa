export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type RegisterData = {
  user: User;
  token: string;
};
