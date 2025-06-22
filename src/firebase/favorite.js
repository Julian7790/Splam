import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

// Fetch favorite songs from Firestore
export const fetchFavoriteSongs = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

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

// Add a song to Firestore favorites
export const addFavoriteSong = async (userId, track) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { favorites: arrayUnion(track) }, { merge: true });
};

// Remove a song from Firestore favorites
export const removeFavoriteSong = async (userId, track) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    favorites: arrayRemove(track),
  });
};
