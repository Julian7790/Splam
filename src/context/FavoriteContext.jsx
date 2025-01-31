import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);

  const toggleFavorite = (track) => {
    setFavorite((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === track.id)) {
        return prevFavorites.filter((fav) => fav.id !== track.id);
      } else {
        return [...prevFavorites, track];
      }
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorite, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);