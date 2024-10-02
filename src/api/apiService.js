import axios from 'axios';

export const api = async () => {
  try {
    const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
    return response.data; // assuming the API returns the tickets and users in data
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return { tickets: [], users: [] }; // Return empty data if the request fails
  }
};
