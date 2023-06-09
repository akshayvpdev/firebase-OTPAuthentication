import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC9uZephk6NEhFb16poSXJZLf4up7yPuVs",
  authDomain: "otp-auth-c2b67.firebaseapp.com",
  projectId: "otp-auth-c2b67",
  storageBucket: "otp-auth-c2b67.appspot.com",
  messagingSenderId: "792749880914",
  appId: "1:792749880914:web:c1123dfc62f5471391918b",
  measurementId: "G-N5NFCN4BV0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


