import React, { useState, useRef, useEffect, useContext } from 'react';
import { useFavorite } from '../context/FavoriteContext.jsx';
import { AuthContext } from '../context/AuthContext';
import { fetchFavoriteSongs, addFavoriteSong, removeFavoriteSong } from '../firebase/favorite.js';
import { heart, redheart, repeat, repeat1, CD } from '../assets';

const FavoritesPage = () => {
  const { favorite, setFavorite } = useFavorite();
  const { user } = useContext(AuthContext);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [repeatMode, setRepeatMode] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (user) {
      const getFavoriteSongs = async () => {
        const songs = await fetchFavoriteSongs(user.uid);
        setFavorite(songs);
      };
      getFavoriteSongs();
    }
  }, [user]);

  const handlePlayClick = (track, audioElement) => {
    if (audioRef.current && audioRef.current !== audioElement) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentTrack(track);
    audioRef.current = audioElement;
    audioElement.play();
  };

  const handleAudioEnded = () => {
    setCurrentTrack(null);
  };

  const handleFavoriteToggle = async (track) => {
    if (!user) return;

    const isFavorite = favorite.some((fav) => fav.id === track.id);

    if (isFavorite) {
      await removeFavoriteSong(user.uid, track);
      setFavorite(favorite.filter((fav) => fav.id !== track.id));
    } else {
      await addFavoriteSong(user.uid, track);
      setFavorite([...favorite, track]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-blue-500">Favorite Songs</h1>
      {favorite.length === 0 ? (
        <p className="text-gray-400">No favorite songs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorite.map((track) => (
            <div
              key={track.id}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                src={track.album.images[0].url}
                alt={track.name}
                className="mb-4 rounded"
              />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {track.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {track.album.artists[0].name}
              </p>

              <audio
                src={track.preview_url}
                controls
                loop={repeatMode}
                onPlay={(event) => handlePlayClick(track, event.target)}
                onEnded={handleAudioEnded}
              ></audio>

              <div className="flex justify-between mt-4">
                <button onClick={() => handleFavoriteToggle(track)}>
                  <img
                    src={redheart}
                    alt="Unfavorite"
                    className="w-12 h-12"
                  />
                </button>

                <button onClick={() => setRepeatMode(!repeatMode)}>
                  <img
                    src={repeatMode ? repeat1 : repeat}
                    alt="Repeat"
                    className="w-12 h-12"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentTrack && (
        <div className="fixed bottom-0 right-0 m-4 flex items-center bg-blue-400 bg-opacity-60 p-4 rounded-lg z-50">
          <img src={CD} alt="CD" className="w-20 h-20 animate-spin-slow" />
          <div className="ml-4 text-white">
            <p className="font-semibold">{currentTrack.name}</p>
            <p className="text-sm">{currentTrack.album.artists[0].name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;












