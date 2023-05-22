import 'firebase/database';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAX8wLQrL5Hjk8CWTqmpY-mhTa1-sL6bmU",
    authDomain: "maceta-inteligente-d062d.firebaseapp.com",
    databaseURL: "https://maceta-inteligente-d062d-default-rtdb.firebaseio.com",
    projectId: "maceta-inteligente-d062d",
    storageBucket: "maceta-inteligente-d062d.appspot.com",
    messagingSenderId: "229443073989",
    appId: "1:229443073989:web:fa09d20cb5353c2ca27dac"
  };
  
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);