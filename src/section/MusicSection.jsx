import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Loading.css';
import { useFavorite } from '../context/FavoriteContext.jsx'; 
import { heart, redheart, repeat, repeat1 } from '../assets'; // Import the repeat SVGs

const MusicSection = () => {
  const [keyword, setKeyword] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { favorite, toggleFavorite } = useFavorite(); // Use the context
  const [repeatMode, setRepeatMode] = useState(false); // State for repeat functionality

  const fetchTracks = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/julian7790/spotify/XfoZHTJSeqafnOpR/search?q=${query}&type=track`
      );
      const data = await response.json();
      setTracks(data.tracks.items);
    } catch (err) {
      setError('Failed to fetch tracks. Please try again.');
      console.error('Error fetching tracks:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTracksByGenre = async (genre) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/julian7790/spotify/XfoZHTJSeqafnOpR/search?q=genre:${genre}&type=track`
      );
      const data = await response.json();
      setTracks(data.tracks.items);
    } catch (err) {
      setError('Failed to fetch tracks by genre. Please try again.');
      console.error('Error fetching tracks by genre:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracksByGenre('r&b'); // Fetch tracks by a default genre on mount
  }, []);

  useEffect(() => {
    if (keyword) {
      fetchTracks(keyword);
    }
  }, [keyword]);

  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-5'>
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          type="search"
          placeholder="Search for Music"
          className="w-full max-w-md p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 font-montserrat font-semibold"
        />
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {tracks.map((track) => (
            <div key={track.id} className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
              <a href="#">
                <img src={track.album.images[0].url} alt={track.name} className='mb-4' />
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{track.name}</h5>
              </a>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 font-palanquin'>{track.album.artists[0].name}</p>
              <audio 
                src={track.preview_url} 
                controls
                loop={repeatMode} // Loop the audio based on the repeat state
              ></audio>

              {/* Heart Button to Favorite/Unfavorite the song */}
              <div className=' flex justify-between'>
              <button
                onClick={() => toggleFavorite(track)}
                className="text-3xl heart-icon"
              >
                <img 
                  src={favorite.some((fav) => fav.id === track.id) ? redheart : heart} 
                  alt="Heart icon" 
                  className="w-12 h-12 mt-4" // Adjust the size and margin-top
                />
              </button>

              {/* Container for repeat button on the right */}
              <div className="flex justify-end mt-4">
                {/* Repeat Button */}
                <button 
                  onClick={() => setRepeatMode(!repeatMode)} 
                  className="text-xl repeat-icon"
                >
                  <img 
                    src={repeatMode ? repeat1 : repeat} // Show repeat1 when repeatMode is true
                    alt="Repeat button" 
                    className="w-12 h-12" // Adjust the size
                  />
                </button>
                </div> 
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Link to Favorite Songs Page */}
      <Link to="/favorites">
        <button className="mt-6 p-2 bg-blue-500 text-white rounded">Go to Favorites</button>
      </Link>
    </div>
  );
};

export default MusicSection;








