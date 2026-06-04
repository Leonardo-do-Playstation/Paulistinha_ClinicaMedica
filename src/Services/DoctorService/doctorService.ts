import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../Config/Firebase";
import { Doctor } from "../../data/types/doctors";

const COLLECTION = "doctors";
const doctorsRef = collection(db, COLLECTION);

export const getDoctors = async (): Promise<Doctor[]> => {
  const q = query(doctorsRef, orderBy("name"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Doctor);
};

export const getDoctorById = async (id: string): Promise<Doctor | null> => {
  const ref = doc(db, COLLECTION, id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Doctor;
};

export const getDoctorsBySpecialty = async (
  specialty: string,
): Promise<Doctor[]> => {
  const q = query(
    doctorsRef,
    where("specialty", "==", specialty),
    orderBy("name"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Doctor);
};

export const getSpecialties = async (): Promise<string[]> => {
  const doctors = await getDoctors();
  const unique = [...new Set(doctors.map((d) => d.specialty))].sort();
  return unique;
};

export const getAvailableHours = (
  doctor: Doctor,
  takenHours: string[],
): string[] => {
  const all = doctor.availableHours ?? [];
  return all.filter((h) => !takenHours.includes(h));
};
