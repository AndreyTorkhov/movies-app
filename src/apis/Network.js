import axios from 'axios';
import {API_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}api/`,
});

api.interceptors.request.use(
  async config => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const response = await axios.get(`${API_URL}/refresh`, {
      headers: {Authorization: `Bearer ${refreshToken}`},
    });
    const {accessToken} = response.data;
    await AsyncStorage.setItem('userToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Refresh token error: ', error);
    throw error;
  }
};

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log('Token refreshed:', newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

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

  const getNewMovies = async () => {
    try {
      const response = await api.get('/movies/new');
      return response.data;
    } catch (error) {
      console.error('Error fetching new movies:', error);
      throw error;
    }
  };

  const getRating = async id => {
    try {
      const response = await api.get('/movies/rating/' + id);
      return response.data;
    } catch (error) {
      console.error('Error fetching rating:', error);
      throw error;
    }
  };

  const getUsersRatedMovies = async id => {
    try {
      const response = await api.get('/user/' + id + '/rated');
      return response.data;
    } catch (error) {
      console.error('Error fetching rating:', error);
      throw error;
    }
  };

  const postRating = async (movieId, userId, rating) => {
    try {
      const response = await api.post('/movies/rating', {
        movieId,
        userId,
        rating,
      });
      return response.data;
    } catch (error) {
      console.error('Error posting rating:', error);
      throw error;
    }
  };

  const getRecommends = async userId => {
    try {
      const response = await api.get('/user/' + userId + '/recommendations');
      return response.data;
    } catch (error) {
      console.error('Error getting recommends:', error);
      throw error;
    }
  };

  const getSimilars = async movieId => {
    try {
      const response = await api.get('/movies/' + movieId + '/similar');
      return response.data;
    } catch (error) {
      console.error('Error getting similars:', error);
      throw error;
    }
  };

  return {
    getMovies,
    getNewMovies,
    getRating,
    getUsersRatedMovies,
    postRating,
    getRecommends,
    getSimilars,
  };
};

export default api;
