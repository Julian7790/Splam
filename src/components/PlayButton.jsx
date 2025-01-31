import React, { useEffect, useRef } from 'react';
import { play, pause } from '../assets'; // Import play and pause icons

const PlayButton = ({ track, currentTrack, setCurrentTrack, audioRefs }) => {
  const audioRef = useRef(null);

  // Ensure we pause the current track if it's different from the clicked one
  useEffect(() => {
    if (currentTrack && currentTrack.id !== track.id) {
      if (audioRefs.current[currentTrack.id]) {
        audioRefs.current[currentTrack.id].pause();
      }
    }
  }, [track, currentTrack, audioRefs]);

  const handlePlayPause = () => {
    // If the same track is clicked again, toggle the play state
    if (currentTrack?.id === track.id) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else {
      // Set the new track as current and play it
      setCurrentTrack(track);
    }
  };

  return (
    <div>
      <audio
        ref={(el) => (audioRefs.current[track.id] = el)}
        src={track.preview_url}
        controls
        autoPlay={currentTrack?.id === track.id}
      />
      <button onClick={handlePlayPause} className="text-3xl mt-4">
        {/* Display play or pause icon */}
        {currentTrack?.id === track.id && !audioRef.current?.paused ? (
          <img src={pause} alt="Pause" className="w-8 h-8" />
        ) : (
          <img src={play} alt="Play" className="w-8 h-8" />
        )}
      </button>
    </div>
  );
};

export default PlayButton;


