// src/utils/firebaseUtils.js
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) {
      throw new Error("User profile not found.");
    }
    return userDoc.data();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getUserRole = async (uid) => {
  const DocRef = doc(db, 'users', uid);
  const docSnap = await getDoc(DocRef);
  return docSnap.data()?.role;
};

export const sendNotification = async (uid, title, body) => {
  try {
    await addDoc(collection(db, "notifications"), {
      uid,
      title,
      body,
      timestamp: new Date(),
    });
    console.log("Notification sent successfully.");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
