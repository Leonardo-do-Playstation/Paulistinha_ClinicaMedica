export type Patient = {
  id?: string;
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  uf?: string;
  observations?: string;
  createdAt?: Date;
};
