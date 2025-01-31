import axios from 'axios';

const shazamApiHost = 'shazam-core.p.rapidapi.com';
const shazamApiKey = '8d18aa1f28mshbc1ba92b4aa1534p1ff94ajsn81ce98700e38';

export const getTrackDetails = async (trackId) => {
  const options = {
    method: 'GET',
    url: `https://shazam-core.p.rapidapi.com/v2/tracks/details?track_id=${trackId}`,
    headers: {
      'x-rapidapi-host': shazamApiHost,
      'x-rapidapi-key': shazamApiKey,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data); // Log the entire response to see its structure

    // Inspect the response structure and adjust these fields accordingly
    const artist = response.data.subtitle || 'Unknown Artist';
    const song = response.data.title || 'Unknown Song';

    return {
      artist,
      song,
    };
  } catch (error) {
    console.error('Error fetching track details:', error);
    return null;
  }
};