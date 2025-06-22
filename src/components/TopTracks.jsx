
import React, { useEffect, useState } from 'react';

const token = 'BQBA1NkfTgLhPEEghbVFRDan1X-bN3KhexoKQCN4WlvZ4wxq5eCC8yv8OPdZuoYr7ZWmSHCaO4Ab8t2yIWHw7dhIhASDuiCtU8ualW0mOvDZeyUXv-8iH9ZN6ZOxxVRrMOYA7tCqw2ggk_I4vlivna9Y_pCYUD-YG9F0GmG0zb37D67NemfDK9O8MTrzMzj5GFZTYOJpqlaEZnEtk4stcxKtDRVB7p_5dPIQ7qu9qgnjOewmI1Pc1LoaV3ezwdiFMRElQHK7';

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const getTopTracks = async () => {
      try {
        const response = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET');
        setTopTracks(response.items);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    getTopTracks();
  }, []);

  return (
    <div>
      <h2>My Top Tracks</h2>
      <ul>
        {topTracks.map((track, index) => (
          <li key={index}>
            <strong>{track.name}</strong> by {track.artists.map(artist => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks; // Exporting TopTracks component as default