import React from "react";
import { useFavorite } from '../context/FavoriteContext.jsx'; // Import the context

const Favorite = () => {
  const { favorite } = useFavorite(); // Use the context

  return (
    <div className="bg-darkBlue flex flex-col items-center min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Favorite Songs</h1>
      {favorite.length === 0 ? (
        <p>No favorite songs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
          {favorite.map((song) => (
            <div key={song.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img src={song.album.images[0].url} alt={song.name} className="mb-4" />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{song.name}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{song.album.artists[0].name}</p>

              {/* Add the audio player */}
              {song.preview_url ? (
                <audio src={song.preview_url} controls className="w-full mt-4"></audio>
              ) : (
                <p className="text-gray-500">No preview available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;