import React, { useState, useRef } from "react";
import { useFavorite } from '../context/FavoriteContext.jsx'; // Import the context
import { heart, redheart, repeat, repeat1, CD } from '../assets'; // Import the heart, repeat buttons, and CD image

const Favorite = () => {
  const { favorite, toggleFavorite } = useFavorite(); // Use the context
  const [repeatMode, setRepeatMode] = useState(false); // State to manage repeat
  const [currentTrack, setCurrentTrack] = useState(null); // Track that's currently playing
  const audioRef = useRef(null); // Reference to the currently playing audio element

  const handlePlayClick = (track, audioElement) => {
    // Stop the previous audio if it's playing
    if (audioRef.current && audioRef.current !== audioElement) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset time
    }

    // Play the selected track
    setCurrentTrack(track);
    audioRef.current = audioElement;
    audioElement.play();
  };

  const handleAudioEnded = () => {
    setCurrentTrack(null); // Hide the CD overlay when the song ends
  };

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

              {/* Audio Player */}
              {song.preview_url ? (
                <audio 
                  src={song.preview_url} 
                  controls 
                  loop={repeatMode} 
                  className="w-full mt-4"
                  onPlay={(e) => handlePlayClick(song, e.target)} // Set current track when played
                  onEnded={handleAudioEnded} // Handle when the audio ends
                ></audio>
              ) : (
                <p className="text-gray-500">No preview available</p>
              )}

              {/* Buttons under the audio player */}
              <div className="flex justify-between mt-4">
                {/* Heart Button to Favorite/Unfavorite the song */}
                <button
                  onClick={() => toggleFavorite(song)}
                  className="text-3xl"
                >
                  <img
                    src={favorite.some((fav) => fav.id === song.id) ? redheart : heart}
                    alt="Heart icon"
                    className="w-12 h-12"
                  />
                </button>

                {/* Repeat Button */}
                <button
                  onClick={() => setRepeatMode(!repeatMode)}
                  className="text-xl"
                >
                  <img
                    src={repeatMode ? repeat1 : repeat}
                    alt="Repeat button"
                    className="w-12 h-12"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CD and song info section that overlays at the bottom-right corner */}
      {currentTrack && (
        <div className="fixed bottom-0 right-0 m-4 flex items-center bg-blue-400 bg-opacity-60 p-4 rounded-lg z-50">
          {/* CD Image */}
          <div className="relative">
            <img 
              src={CD} 
              alt="CD" 
              className="w-20 h-20 animate-spin-slow" // Spinning effect for the CD
            />
          </div>

          {/* Song and Artist Info */}
          <div className="ml-4 text-white">
            <p className="font-semibold">{currentTrack.name}</p>
            <p className="text-sm">{currentTrack.album.artists[0].name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorite;

