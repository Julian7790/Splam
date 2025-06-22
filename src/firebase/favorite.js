// src/firebase/favorite.js
import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const fetchFavoriteSongs = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().favorites || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

export const addFavoriteSong = async (userId, track) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { favorites: arrayUnion(track) }, { merge: true });
    console.log("✅ Added to Firestore:", track);
  } catch (err) {
    console.error("❌ Error adding to Firestore:", err);
  }
};

export const removeFavoriteSong = async (userId, track) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      favorites: arrayRemove(track),
    });
    console.log("🗑️ Removed from Firestore:", track);
  } catch (err) {
    console.error("❌ Error removing from Firestore:", err);
  }
};
