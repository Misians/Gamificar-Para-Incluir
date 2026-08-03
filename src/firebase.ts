import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXJ4iUy9jv-tk52BdxUK_e2WdCNk2KDic",
  authDomain: "gamificarparaincluir-81675.firebaseapp.com",
  projectId: "gamificarparaincluir-81675",
  storageBucket: "gamificarparaincluir-81675.firebasestorage.app",
  messagingSenderId: "376605872563",
  appId: "1:376605872563:web:efc15e9e8c9195f4697bc6",
  measurementId: "G-QG23LZ6TF6"

};

const app = initializeApp(firebaseConfig);
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);