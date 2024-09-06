// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export {app, auth};