// frontend/firebase.js
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; 
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyBWjwd22eMChAKhrf4SOJgYxzrzNNYqegM",
  authDomain: "ourzone-d56f1.firebaseapp.com",
  projectId: "ourzone-d56f1",
  storageBucket: "ourzone-d56f1.appspot.com",
  messagingSenderId: "296128217464",
  appId: "1:296128217464:web:329536df04f342b6e2c88d",
  measurementId: "G-KYPNKHZP4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth và Firestore
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app); 

export { app, auth, db }; // Xuất app, auth, db
