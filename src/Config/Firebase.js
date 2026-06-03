import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZuA0nuhjhjc8PTiOC1kGirIk3rlMuASw",
  authDomain: "mariaauxiliadora-9619e.firebaseapp.com",
  projectId: "mariaauxiliadora-9619e",
  storageBucket: "mariaauxiliadora-9619e.firebasestorage.app",
  messagingSenderId: "128106462533",
  appId: "1:128106462533:web:fb4332a32b89dc4ea3922c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
