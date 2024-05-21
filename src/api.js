import api from './apis/Network.js';

export const useApi = () => {
  const getMovies = async () => {
    try {
      const response = await api.get('/movies');
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };

  return {getMovies};
};
