import axios from 'axios';

export const fetchTools = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/tools');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tools:', error);
    throw error;
  }
};
