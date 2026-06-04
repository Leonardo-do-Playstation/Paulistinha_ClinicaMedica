import {
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../Config/Firebase";
import { Doctor } from "../../data/types/doctorTypes";

const COLLECTION = "doctors";
const doctorsRef = collection(db, COLLECTION);

export const getDoctors = async (): Promise<Doctor[]> => {
  const snapshot = await getDocs(doctorsRef);
  const doctors = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Doctor);
  return doctors.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
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
  const doctors = await getDoctors();
  return doctors.filter(
    (d) => d.specialty?.trim().toLowerCase() === specialty.trim().toLowerCase(),
  );
};

export const getSpecialties = async (): Promise<string[]> => {
  const doctors = await getDoctors();
  const unique = [
    ...new Set(
      doctors
        .map((d) => d.specialty?.trim())
        .filter((s): s is string => !!s),
    ),
  ].sort();
  return unique;
};

export const getAvailableHours = (
  doctor: Doctor,
  takenHours: string[],
): string[] => {
  const all = doctor.availableHours ?? [];
  return all.filter((h) => !takenHours.includes(h));
};