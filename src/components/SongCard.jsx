// src/components/SongCard.jsx
import React from 'react';

const SongCard = ({ track, toggleFavorite, isCurrentTrack, handlePlayClick }) => {
  const handleLikeClick = (e) => {
    e.stopPropagation();
    toggleFavorite(track);
  };

  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-lg ${isCurrentTrack ? 'border-2 border-blue-500' : ''}`}
      onClick={() => handlePlayClick(track, document.getElementById(`audio-${track.id}`))}
    >
      <img src={track.album.images[0].url} alt={track.name} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h2 className="text-xl font-semibold mb-2">{track.name}</h2>
      <p className="text-gray-600">{track.artists.map((artist) => artist.name).join(', ')}</p>

      {/* Heart / Like button */}
      <button
        onClick={handleLikeClick}
        className={`mt-4 p-2 ${track.isFavorite ? 'text-red-500' : 'text-gray-400'}`}
      >
        {track.isFavorite ? '❤️' : '🤍'}
      </button>

      {/* Audio element (hidden) */}
      <audio id={`audio-${track.id}`} src={track.preview_url} />
    </div>
  );
};

export default SongCard;
