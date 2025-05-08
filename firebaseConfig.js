import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBuQgq-KUy2WH0_MQVFr1dYNyt9ErkxKr0",
  authDomain: "pinswap-94f78.firebaseapp.com",
  projectId: "pinswap-94f78",
  storageBucket: "pinswap-94f78.appspot.com",
  messagingSenderId: "950338116401",
  appId: "1:950338116401:web:580b37e931459782036e10",
  measurementId: "G-FTLJR6MHCZ",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };