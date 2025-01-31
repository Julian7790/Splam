import React, { useState, useRef } from 'react';
import { useFavorite } from '../context/FavoriteContext.jsx'; 
import { heart, redheart, CD } from '../assets'; // Import necessary assets

const FavoritesPage = () => {
  const { favorite, toggleFavorite } = useFavorite(); // Access favorite songs
  const [currentTrack, setCurrentTrack] = useState(null); // Track currently playing
  const audioRef = useRef(null); // Reference to currently playing audio element

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
    setCurrentTrack(null); // Hide CD overlay when song ends
  };

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-3xl font-bold mb-6'>Favorite Songs</h1>
      {favorite.length === 0 ? (
        <p>No favorite songs yet.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {favorite.map((track) => (
            <div key={track.id} className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
              <img src={track.album.images[0].url} alt={track.name} className='mb-4' />
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{track.name}</h5>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{track.album.artists[0].name}</p>
              <audio 
                src={track.preview_url} 
                controls
                onPlay={(event) => handlePlayClick(track, event.target)} // Ensure only one plays at a time
                onEnded={handleAudioEnded} // Reset when the audio ends
              ></audio>
              
              {/* Heart Button to Unfavorite */}
              <button onClick={() => toggleFavorite(track)} className='mt-4'>
                <img 
                  src={redheart} 
                  alt='Unfavorite' 
                  className='w-12 h-12' 
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CD and song info overlay */}
      {currentTrack && (
        <div className='fixed bottom-0 right-0 m-4 flex items-center bg-blue-400 bg-opacity-60 p-4 rounded-lg z-50'>
          <img 
            src={CD} 
            alt='CD' 
            className='w-20 h-20 animate-spin-slow' // Spinning effect for the CD
          />
          <div className='ml-4 text-white'>
            <p className='font-semibold'>{currentTrack.name}</p>
            <p className='text-sm'>{currentTrack.album.artists[0].name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

