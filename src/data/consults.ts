import { Timestamp } from "firebase/firestore";

export type ConsultStatus =
  | "Marcada"
  | "Confirmada"
  | "Realizada"
  | "Cancelada Pelo Paciente"
  | "Cancelada Pelo Médico";

export type CancelReason =
  | "Solicitação do Paciente"
  | "Não Comparecimento"
  | "Indisponibilidade Médico"
  | "Outro Motivo";

export type Consult = {
  id?: string;

  patientId: string;
  patientName: string;
  patientPhone: string;

  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;

  date: string;
  time: string;
  status: ConsultStatus;
  createdAt?: Date | Timestamp;

  cancelReason?: CancelReason;
  cancelObservations?: string;
  canceledBy?: "secretaria" | "medico";

  procedures?: string[];
  otherProcedures?: string;
  paymentMethod?: "Dinheiro" | "Cartão" | "Pix" | "Plano de Saúde";
  paymentValue?: number;
  healthPlan?: string;
  authorizationNumber?: string;
  observations?: string;
  hasReturn?: boolean;
};
