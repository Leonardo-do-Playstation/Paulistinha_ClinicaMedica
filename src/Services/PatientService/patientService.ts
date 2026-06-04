import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "../../Config/Firebase";
import { Patient } from "../../data/types/patients";

const COLLECTION = "patients";
const patientsRef = collection(db, COLLECTION);

export const getPatients = async (): Promise<Patient[]> => {
  const q = query(patientsRef, orderBy("name"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Patient);
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  const ref = doc(db, COLLECTION, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Patient;
};

export const searchPatientsByName = async (
  name: string,
): Promise<Patient[]> => {
  const q = query(
    patientsRef,
    orderBy("name"),
    where("name", ">=", name),
    where("name", "<=", name + "\uf8ff"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Patient);
};

export const createPatient = async (
  patient: Omit<Patient, "id">,
): Promise<string> => {
  const docRef = await addDoc(patientsRef, {
    ...patient,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const updatePatient = async (
  id: string,
  data: Partial<Omit<Patient, "id">>,
): Promise<void> => {
  await updateDoc(doc(db, COLLECTION, id), data);
};

export const deletePatient = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION, id));
};
