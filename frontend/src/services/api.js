import axios from 'axios';

const API_URL = 'http://example.com/api';

export const fetchTools = async () => {
  try {
    const response = await axios.get(`${API_URL}/tools`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
