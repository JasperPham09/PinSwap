// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBuQgq-KUy2WH0_MQVFr1dYNyt9ErkxKr0",
  authDomain: "pinswap-94f78.firebaseapp.com",
  projectId: "pinswap-94f78",
  storageBucket: "pinswap-94f78.firebasestorage.app",
  messagingSenderId: "950338116401",
  appId: "1:950338116401:web:580b37e931459782036e10",
  measurementId: "G-FTLJR6MHCZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);