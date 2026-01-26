export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  latitude?: number;
  longitude?: number;
  createdAt: string;
  address: string;
};

export type UpdateProfileInput = {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: File | null;
  address: string;
};