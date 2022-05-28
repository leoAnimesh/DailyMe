// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBRM0L0roxW_3YQRs_R8OMsd5kcPdWBY10',
  authDomain: 'dailyme-cb1a3.firebaseapp.com',
  projectId: 'dailyme-cb1a3',
  storageBucket: 'dailyme-cb1a3.appspot.com',
  messagingSenderId: '461238301046',
  appId: '1:461238301046:web:a5802e0df906d6d693ca57',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
