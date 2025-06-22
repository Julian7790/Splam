import React, { createContext, useContext, useEffect, useState } from "react";
import { addFavoriteSong, removeFavoriteSong, fetchFavoriteSongs } from "../firebase/favorite";
import { auth } from "../firebase/firebase";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const user = auth.currentUser;
      if (user) {
        const songs = await fetchFavoriteSongs(user.uid);
        setFavorite(songs);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (track) => {
    const user = auth.currentUser;
    if (!user) return alert("Please sign in.");

    const exists = favorite.some((fav) => fav.id === track.id);

    if (exists) {
      await removeFavoriteSong(user.uid, track);
      setFavorite(favorite.filter((fav) => fav.id !== track.id));
    } else {
      await addFavoriteSong(user.uid, track);
      setFavorite([...favorite, track]);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorite, toggleFavorite, setFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);




