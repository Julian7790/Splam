import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Loading.css';
import { useFavorite } from '../context/FavoriteContext.jsx'; 

const MusicSection = () => {
  const [keyword, setKeyword] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { favorite, toggleFavorite } = useFavorite(); // Use the context

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
              <audio src={track.preview_url} controls></audio>

              {/* Heart Button to Favorite/Unfavorite the song */}
              <button
                onClick={() => toggleFavorite(track)}
                className={`text-3xl heart-icon ${favorite.some((fav) => fav.id === track.id) ? 'text-red-500' : 'text-gray-500'}`}
              >
                ❤️
              </button>
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





