import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy,
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

export const getConsults = async (): Promise<Consult[]> => {
  const q = query(consultsRef, orderBy("date"), orderBy("time"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Consult);
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
  const q = query(
    consultsRef,
    where("status", "==", status),
    orderBy("date"),
    orderBy("time"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Consult);
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
  todayDate: string, // formato "dd/mm/aaaa"
): Promise<Consult[]> => {
  const q = query(
    consultsRef,
    where("status", "==", status),
    where("date", "==", todayDate),
    orderBy("time"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Consult);
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
  await updateDoc(doc(db, COLLECTION, id), {
    ...data,
    status: "Realizada" as ConsultStatus,
  });
};
