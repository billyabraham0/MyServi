import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import messaging from "@react-native-firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDgORQQPAF2ch2ivixl5oNzraiCA4HjKu4",
  authDomain: "myservi.firebaseapp.com",
  projectId: "myservi",
  storageBucket: "myservi-ca67a.firebasestorage.app",
  messagingSenderId: "596523343916",
  appId: "1:596523343916:web:d57597235cda42775cb189",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Firebase Messaging
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

setLogLevel("debug");

export { db, auth };
