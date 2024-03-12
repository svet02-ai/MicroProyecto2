// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIsaYMhkYCdpE-2PlOQjqyCPo8EgpQQNM",
  authDomain: "microproyecto2-ebe69.firebaseapp.com",
  databaseURL: "https://microproyecto2-ebe69-default-rtdb.firebaseio.com",
  projectId: "microproyecto2-ebe69",
  storageBucket: "microproyecto2-ebe69.appspot.com",
  messagingSenderId: "555864284301",
  appId: "1:555864284301:web:0e3eba7288238f06b396c4",
  measurementId: "G-J99HMTJ1GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };