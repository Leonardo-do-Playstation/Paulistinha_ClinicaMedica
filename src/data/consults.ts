export type Consult = {
  id: number;
  name: string;
  doctor: string;
  date: string;
  time: string;
  specialty: string;
  phone: string;
};

export const consults: Consult[] = [
  {
    id: 1,
    name: "Maria Silva",
    phone: "(11) 98765-4321",
    date: "2026-06-15",
    time: "09:00",
    doctor: "Dr. Pedro Alves",
    specialty: "Cardiologia",
  },
  {
    id: 2,
    name: "João Pereira",
    phone: "(21) 91234-5678",
    date: "2024-06-15",
    time: "10:30",
    doctor: "Dra. Ana Souza",
    specialty: "Dermatologia",
  },
  {
    id: 3,
    name: "Carlos Santos",
    phone: "(31) 99887-7665",
    date: "2024-06-15",
    time: "14:15",
    doctor: "Dr. Roberto Lima",
    specialty: "Ortopedia",
  },
  {
    id: 4,
    name: "Luciana Costa",
    phone: "(11) 97766-5544",
    date: "2024-06-15",
    time: "16:00",
    doctor: "Dra. Marina Dias",
    specialty: "Pediatria",
  },
];
