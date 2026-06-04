export type Doctor = {
  id?: string;
  name: string;
  specialty: string;
  crm: string;
  phone: string;
  image?: string;
  availableDays?: string[];
  availableHours?: string[];
};
