import axios from 'axios';

const clientId = 'c3d64db938714de9bac5b59f9d8859c3';
const spotifyApiBaseUrl = 'https://api.spotify.com';

// Function to fetch data from Spotify API
export const fetchSpotifyData = async (endpoint, method = 'GET', params = {}) => {
  try {
    const response = await axios({
      method: method,
      url: `${spotifyApiBaseUrl}/${endpoint}`,
      headers: {
        'Authorization': `Bearer ${clientId}` // Include client ID in Authorization header
      },
      params: params
    });

    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching data from Spotify API:', error);
    throw error; // Handle error appropriately in your application
  }
};

