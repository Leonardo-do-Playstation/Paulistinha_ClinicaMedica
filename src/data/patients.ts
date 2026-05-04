export type Patient = {
  id: number;
  name: string;
  phone: string;
  cpf: string;
};

export const patients: Patient[] = [
  {
    id: 1,
    name: "Maria Silva",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
  },
  {
    id: 2,
    name: "João Santos",
    phone: "(11) 97654-3210",
    cpf: "987.654.321-00",
  },
  {
    id: 3,
    name: "Ana Costa",
    phone: "(11) 96543-2109",
    cpf: "456.789.123-00",
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    phone: "(11) 95432-1098",
    cpf: "321.654.987-00",
  },
];
