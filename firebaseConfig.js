import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Khởi tạo app
const app = initializeApp(firebaseConfig);

// Dùng getAuth (tự động chọn persistence phù hợp với môi trường web/Expo)
const auth = getAuth(app);

// Khởi tạo Firestore
const db = getFirestore(app);

export { auth, db};