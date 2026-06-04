import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../Config/Firebase";
import {
  Consult,
  ConsultStatus,
  CancelReason,
} from "../../data/types/consultTypes";

const COLLECTION = "consults";
const consultsRef = collection(db, COLLECTION);

const sortConsults = (list: Consult[]): Consult[] => {
  const parse = (d: string) => {
    const [day, month, year] = d.split("/");
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  };
  return list.sort((a, b) => {
    const dateDiff = parse(a.date) - parse(b.date);
    if (dateDiff !== 0) return dateDiff;
    return a.time.localeCompare(b.time);
  });
};

export const getConsults = async (): Promise<Consult[]> => {
  const snapshot = await getDocs(consultsRef);
  const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Consult);
  return sortConsults(list);
};

export const getConsultById = async (id: string): Promise<Consult | null> => {
  const ref = doc(db, COLLECTION, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Consult;
};

export const getConsultsByStatus = async (
  status: ConsultStatus,
): Promise<Consult[]> => {
  const q = query(consultsRef, where("status", "==", status));
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Consult);
  return sortConsults(list);
};

export const getConsultsByDoctorAndDate = async (
  doctorId: string,
  date: string,
): Promise<Consult[]> => {
  const q = query(
    consultsRef,
    where("doctorId", "==", doctorId),
    where("date", "==", date),
    where("status", "in", ["Marcada", "Confirmada"]),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Consult);
};

export const getTodayConsultsByStatus = async (
  status: ConsultStatus,
  todayDate: string,
): Promise<Consult[]> => {
  const q = query(
    consultsRef,
    where("status", "==", status),
    where("date", "==", todayDate),
  );
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Consult);
  return list.sort((a, b) => a.time.localeCompare(b.time));
};

export const createConsult = async (
  consult: Omit<Consult, "id" | "status" | "createdAt">,
): Promise<string> => {
  const docRef = await addDoc(consultsRef, {
    ...consult,
    status: "Marcada" as ConsultStatus,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const confirmConsult = async (id: string): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, id), {
    status: "Confirmada" as ConsultStatus,
  });
};

export const cancelConsult = async (
  id: string,
  reason: CancelReason,
  canceledBy: "secretaria" | "medico",
  observations?: string,
): Promise<void> => {
  const status: ConsultStatus =
    canceledBy === "medico"
      ? "Cancelada Pelo Médico"
      : "Cancelada Pelo Paciente";

  await updateDoc(doc(db, COLLECTION, id), {
    status,
    cancelReason: reason,
    canceledBy,
    cancelObservations: observations ?? "",
  });
};

export const markAsRealized = async (id: string): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, id), {
    status: "Realizada" as ConsultStatus,
  });
};

export const finishConsult = async (
  id: string,
  data: {
    procedures: string[];
    otherProcedures?: string;
    paymentMethod: "Dinheiro" | "Cartão" | "Pix" | "Plano de Saúde";
    paymentValue: number;
    healthPlan?: string;
    authorizationNumber?: string;
    observations?: string;
    hasReturn: boolean;
  },
): Promise<void> => {

  const clean: Record<string, any> = {
    status: "Realizada" as ConsultStatus,
    procedures: data.procedures,
    paymentMethod: data.paymentMethod,
    paymentValue: data.paymentValue,
    hasReturn: data.hasReturn,
  };
  if (data.otherProcedures) clean.otherProcedures = data.otherProcedures;
  if (data.observations) clean.observations = data.observations;
  if (data.healthPlan) clean.healthPlan = data.healthPlan;
  if (data.authorizationNumber) clean.authorizationNumber = data.authorizationNumber;

  await updateDoc(doc(db, COLLECTION, id), clean);
};