import React, { useState, useEffect } from 'react';
import './Loading.css'; 

const MusicSection = () => {
  const [keyword, setKeyword] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false); 

  const getTracks = async (query) => {
    setLoading(true); 
    try {
      const response = await fetch(`https://v1.nocodeapi.com/julian7790/spotify/XfoZHTJSeqafnOpR/search?q=${query}&type=track`);
      const data = await response.json();
      setTracks(data.tracks.items);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    } finally {
      setLoading(false); 
    }
  };

  const getTracksByGenre = async (genre) => {
    setLoading(true);
    try {
      const response = await fetch(`https://v1.nocodeapi.com/julian7790/spotify/XfoZHTJSeqafnOpR/search?q=${genre}&type=track`);
      const data = await response.json();
      setTracks(data.tracks.items);
    } catch (error) {
      console.error(`Error fetching ${genre} tracks:`, error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getTracks('');
  }, []);

  useEffect(() => {
    if (keyword) {
      getTracks(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    getTracksByGenre('W');
  }, []);

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
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {tracks.map((track) => (
            <div key={track.id} className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
              <a href="#">
                <img src={track.album.images[0].url} alt={track.name} className='mb-4'/>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{track.name}</h5>
              </a>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 font-palanquin'>{track.album.artists[0].name}</p>
              <audio src={track.preview_url} controls ></audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicSection;



